import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Branch,
  MembershipPlan,
  GymClass,
  ClassScheduleItem,
  ClassBooking,
  FreeTrialLead,
  Order,
  AuditLogItem,
  Trainer
} from '../types';
import {
  INITIAL_BRANCHES,
  INITIAL_MEMBERSHIP_PLANS,
  INITIAL_CLASSES,
  INITIAL_SCHEDULE,
  INITIAL_TRAINERS,
  INITIAL_AUDIT_LOGS
} from '../data/initialData';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  // Navigation & Routing
  currentPath: string;
  navigate: (path: string) => void;

  // Currency
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
  formatPrice: (amountINR: number) => string;

  // Branches
  branches: Branch[];
  selectedBranch: Branch;
  setSelectedBranch: (branch: Branch) => void;

  // User & Auth
  user: User | null;
  login: (email: string, role?: 'member' | 'admin') => boolean;
  logout: () => void;
  register: (name: string, email: string, phone: string) => void;
  switchRole: (role: 'member' | 'admin') => void;

  // Data
  membershipPlans: MembershipPlan[];
  updateMembershipPlan: (updatedPlan: MembershipPlan) => void;
  classes: GymClass[];
  schedules: ClassScheduleItem[];
  trainers: Trainer[];

  // Bookings
  userBookings: ClassBooking[];
  bookClass: (scheduleId: string) => { success: boolean; message: string };
  cancelBooking: (bookingId: string) => { success: boolean; message: string };

  // Free Trials
  trialLeads: FreeTrialLead[];
  submitFreeTrial: (lead: Omit<FreeTrialLead, 'id' | 'status' | 'passCode' | 'createdAt'>) => FreeTrialLead;

  // Checkout & Orders
  selectedCheckoutPlanId: string | null;
  setSelectedCheckoutPlanId: (planId: string | null) => void;
  orders: Order[];
  createOrder: (planId: string, paymentMethod: string, promoCode?: string) => Order;

  // Admin Logs
  auditLogs: AuditLogItem[];
  addAuditLog: (action: string, target: string, details: string) => void;

  // Notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_MEMBER: User = {
  id: 'usr-member-01',
  name: 'Aryan Verma',
  email: 'aryan.verma@example.com',
  phone: '+91 98765 43210',
  role: 'member',
  membershipStatus: 'active',
  activePlanId: 'plan-fit',
  membershipExpiry: '2027-05-15',
  joinedDate: '2026-05-15',
  fitnessGoal: 'Hypertrophy & VO2 Max Endurance'
};

const DEMO_ADMIN: User = {
  id: 'usr-admin-01',
  name: 'Kavita Roy (General Manager)',
  email: 'admin@voltclub.com',
  phone: '+91 98200 11223',
  role: 'admin',
  membershipStatus: 'active',
  joinedDate: '2025-01-01'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Route state synced with browser history
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const navigate = (path: string) => {
    if (path === currentPath) return;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Currency
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const formatPrice = (amountINR: number) => {
    if (currency === 'INR') {
      return `₹${amountINR.toLocaleString('en-IN')}`;
    } else {
      // Approximate 1 USD ~ 83 INR
      const usd = Math.round(amountINR / 80);
      return `$${usd.toLocaleString('en-US')}`;
    }
  };

  // Branches
  const [branches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [selectedBranch, setSelectedBranch] = useState<Branch>(INITIAL_BRANCHES[0]);

  // Auth User
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('volt_auth_user');
    return saved ? JSON.parse(saved) : DEMO_MEMBER;
  });

  const login = (email: string, role: 'member' | 'admin' = 'member') => {
    const targetUser = role === 'admin' || email.includes('admin') ? DEMO_ADMIN : {
      ...DEMO_MEMBER,
      email: email || DEMO_MEMBER.email
    };
    setUser(targetUser);
    localStorage.setItem('volt_auth_user', JSON.stringify(targetUser));
    showToast(`Welcome back, ${targetUser.name}!`, 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('volt_auth_user');
    showToast('You have been logged out safely.', 'info');
    navigate('/');
  };

  const register = (name: string, email: string, phone: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'member',
      membershipStatus: 'pending',
      joinedDate: new Date().toISOString().split('T')[0],
      fitnessGoal: 'General Athletic Conditioning'
    };
    setUser(newUser);
    localStorage.setItem('volt_auth_user', JSON.stringify(newUser));
    showToast('Account created successfully! Choose a plan to activate membership.', 'success');
    navigate('/membership');
  };

  const switchRole = (role: 'member' | 'admin') => {
    if (role === 'admin') {
      setUser(DEMO_ADMIN);
      localStorage.setItem('volt_auth_user', JSON.stringify(DEMO_ADMIN));
      showToast('Switched to Staff/Admin view (Kavita Roy).', 'info');
      navigate('/admin');
    } else {
      setUser(DEMO_MEMBER);
      localStorage.setItem('volt_auth_user', JSON.stringify(DEMO_MEMBER));
      showToast('Switched to Customer view (Aryan Verma).', 'info');
      navigate('/account');
    }
  };

  // Core Data
  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>(() => {
    const saved = localStorage.getItem('volt_membership_plans');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERSHIP_PLANS;
  });

  const updateMembershipPlan = (updatedPlan: MembershipPlan) => {
    const updated = membershipPlans.map(p => p.id === updatedPlan.id ? updatedPlan : p);
    setMembershipPlans(updated);
    localStorage.setItem('volt_membership_plans', JSON.stringify(updated));
    addAuditLog('Plan Modified', updatedPlan.name, `Price updated to INR ${updatedPlan.priceINR}`);
    showToast(`Plan ${updatedPlan.name} updated successfully.`, 'success');
  };

  const [classes] = useState<GymClass[]>(INITIAL_CLASSES);
  const [schedules, setSchedules] = useState<ClassScheduleItem[]>(() => {
    const saved = localStorage.getItem('volt_schedules');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });
  const [trainers] = useState<Trainer[]>(INITIAL_TRAINERS);

  // Bookings
  const [userBookings, setUserBookings] = useState<ClassBooking[]>(() => {
    const saved = localStorage.getItem('volt_user_bookings');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'bk-demo-1',
        userId: 'usr-member-01',
        scheduleId: 'sch-1',
        className: 'VOLT Forge (Strength & Hypertrophy)',
        dayOfWeek: 'Monday',
        time: '07:00 AM',
        trainerName: 'Vikram Sengupta',
        branchName: 'VOLT Flagship Indiranagar',
        bookingDate: '2026-11-03',
        status: 'confirmed'
      },
      {
        id: 'bk-demo-2',
        userId: 'usr-member-01',
        scheduleId: 'sch-3',
        className: 'Athletic Flow & Mobility',
        dayOfWeek: 'Wednesday',
        time: '06:00 PM',
        trainerName: 'Priya Nambiar',
        branchName: 'VOLT Flagship Indiranagar',
        bookingDate: '2026-11-05',
        status: 'confirmed'
      }
    ];
  });

  const bookClass = (scheduleId: string): { success: boolean; message: string } => {
    if (!user) {
      navigate('/login');
      return { success: false, message: 'Please log in or register to book classes.' };
    }

    const schedule = schedules.find(s => s.id === scheduleId);
    if (!schedule) {
      return { success: false, message: 'Schedule session not found.' };
    }

    // Check capacity
    if (schedule.bookedCount >= schedule.capacity) {
      return { success: false, message: 'This class has reached full capacity. You may join the waitlist.' };
    }

    // Check duplicate booking
    const alreadyBooked = userBookings.some(
      b => b.scheduleId === scheduleId && b.userId === user.id && b.status === 'confirmed'
    );
    if (alreadyBooked) {
      return { success: false, message: 'You have already booked this exact class session.' };
    }

    const gymClass = classes.find(c => c.id === schedule.classId);
    const trainer = trainers.find(t => t.id === schedule.trainerId);
    const branch = branches.find(b => b.id === schedule.branchId);

    const newBooking: ClassBooking = {
      id: `bk-${Date.now()}`,
      userId: user.id,
      scheduleId: schedule.id,
      className: gymClass ? gymClass.name : 'VOLT Class',
      dayOfWeek: schedule.dayOfWeek,
      time: schedule.time,
      trainerName: trainer ? trainer.name : 'Lead Coach',
      branchName: branch ? branch.name : 'VOLT Club',
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'confirmed'
    };

    const updatedBookings = [newBooking, ...userBookings];
    setUserBookings(updatedBookings);
    localStorage.setItem('volt_user_bookings', JSON.stringify(updatedBookings));

    // Increment capacity
    const updatedSchedules = schedules.map(s => {
      if (s.id === scheduleId) {
        return {
          ...s,
          bookedCount: s.bookedCount + 1,
          status: (s.bookedCount + 1 >= s.capacity ? 'full' : 'available') as 'full' | 'available'
        };
      }
      return s;
    });
    setSchedules(updatedSchedules);
    localStorage.setItem('volt_schedules', JSON.stringify(updatedSchedules));

    addAuditLog('Class Booked', newBooking.className, `Member ${user.name} confirmed for ${schedule.time}`);
    showToast(`Booked ${newBooking.className}! Confirmation sent to ${user.email}.`, 'success');
    return { success: true, message: 'Booking confirmed!' };
  };

  const cancelBooking = (bookingId: string): { success: boolean; message: string } => {
    const booking = userBookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: 'Booking not found.' };

    const updatedBookings = userBookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' as const } : b);
    setUserBookings(updatedBookings);
    localStorage.setItem('volt_user_bookings', JSON.stringify(updatedBookings));

    // Release seat
    const updatedSchedules = schedules.map(s => {
      if (s.id === booking.scheduleId && s.bookedCount > 0) {
        return {
          ...s,
          bookedCount: s.bookedCount - 1,
          status: 'available' as const
        };
      }
      return s;
    });
    setSchedules(updatedSchedules);
    localStorage.setItem('volt_schedules', JSON.stringify(updatedSchedules));

    showToast(`Cancelled reservation for ${booking.className}.`, 'info');
    return { success: true, message: 'Booking cancelled successfully.' };
  };

  // Free Trials
  const [trialLeads, setTrialLeads] = useState<FreeTrialLead[]>(() => {
    const saved = localStorage.getItem('volt_trial_leads');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'trl-101',
        fullName: 'Sameer Sen',
        email: 'sameer.sen@outlook.com',
        phone: '+91 99887 76655',
        branchId: 'branch-blr',
        preferredDate: '2026-11-04',
        preferredTime: '06:00 PM',
        fitnessGoal: 'Build Muscle & Strength',
        status: 'confirmed',
        passCode: 'VOLT-PASS-7842',
        createdAt: '2026-10-30'
      }
    ];
  });

  const submitFreeTrial = (leadData: Omit<FreeTrialLead, 'id' | 'status' | 'passCode' | 'createdAt'>) => {
    const randomCode = `VOLT-PASS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead: FreeTrialLead = {
      ...leadData,
      id: `trl-${Date.now()}`,
      status: 'confirmed',
      passCode: randomCode,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newLead, ...trialLeads];
    setTrialLeads(updated);
    localStorage.setItem('volt_trial_leads', JSON.stringify(updated));

    addAuditLog('Free Trial Generated', newLead.fullName, `Pass Code ${randomCode} for ${newLead.preferredDate}`);
    return newLead;
  };

  // Checkout & Orders
  const [selectedCheckoutPlanId, setSelectedCheckoutPlanId] = useState<string | null>('plan-fit');
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('volt_orders');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'ord-1001',
        userId: 'usr-member-01',
        planId: 'plan-fit',
        planName: 'FIT Monthly Membership',
        amount: 2358, // 1999 + 18% GST (359)
        currency: 'INR',
        status: 'paid',
        paymentMethod: 'Razorpay UPI (GPay)',
        transactionId: 'pay_RZP_99214710',
        invoiceNumber: 'INV-VOLT-2026-8812',
        createdAt: '2026-10-15',
        taxAmount: 359,
        discountAmount: 0
      }
    ];
  });

  const createOrder = (planId: string, paymentMethod: string, promoCode?: string): Order => {
    const plan = membershipPlans.find(p => p.id === planId) || membershipPlans[1];
    let basePrice = plan.priceINR;
    let discount = 0;

    if (promoCode?.toUpperCase() === 'VOLTSTART') {
      discount = Math.round(basePrice * 0.2); // 20% off
    } else if (promoCode?.toUpperCase() === 'FITINDIA20') {
      discount = Math.round(basePrice * 0.2);
    } else if (promoCode?.toUpperCase() === 'EARLYBIRD') {
      discount = 500;
    }

    const discountedPrice = Math.max(0, basePrice - discount);
    const tax = Math.round(discountedPrice * 0.18); // 18% GST
    const total = discountedPrice + tax;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      userId: user?.id || 'usr-guest',
      planId: plan.id,
      planName: `${plan.name} Membership`,
      amount: total,
      currency: 'INR',
      status: 'paid',
      paymentMethod,
      transactionId: `TXN_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      invoiceNumber: `INV-VOLT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0],
      taxAmount: tax,
      discountAmount: discount,
      promoCodeUsed: promoCode
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('volt_orders', JSON.stringify(updated));

    // Update member active plan
    if (user) {
      const oneYearAhead = new Date();
      oneYearAhead.setFullYear(oneYearAhead.getFullYear() + (plan.period === 'year' ? 1 : 0));
      if (plan.period === 'month') {
        oneYearAhead.setMonth(oneYearAhead.getMonth() + 1);
      }
      const updatedUser: User = {
        ...user,
        membershipStatus: 'active',
        activePlanId: plan.id,
        membershipExpiry: oneYearAhead.toISOString().split('T')[0]
      };
      setUser(updatedUser);
      localStorage.setItem('volt_auth_user', JSON.stringify(updatedUser));
    }

    addAuditLog('Membership Purchased', plan.name, `Order ${newOrder.invoiceNumber} paid via ${paymentMethod}`);
    return newOrder;
  };

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem('volt_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const addAuditLog = (action: string, target: string, details: string) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      action,
      performedBy: user?.name || 'System',
      target,
      timestamp: new Date().toLocaleString('en-IN'),
      details
    };
    const updated = [newLog, ...auditLogs];
    setAuditLogs(updated);
    localStorage.setItem('volt_audit_logs', JSON.stringify(updated));
  };

  // Toast Notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        currency,
        setCurrency,
        formatPrice,
        branches,
        selectedBranch,
        setSelectedBranch,
        user,
        login,
        logout,
        register,
        switchRole,
        membershipPlans,
        updateMembershipPlan,
        classes,
        schedules,
        trainers,
        userBookings,
        bookClass,
        cancelBooking,
        trialLeads,
        submitFreeTrial,
        selectedCheckoutPlanId,
        setSelectedCheckoutPlanId,
        orders,
        createOrder,
        auditLogs,
        addAuditLog,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
