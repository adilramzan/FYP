
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Translation Resources
const resources = {
  en: {
    translation: {
      // Welcome Screen
      title: 'Discover Your Dream Job',
      subtitle: 'Explore thousands of job opportunities tailored just for you.',
      register: 'Register',
      employee: 'Employee',
      employer: 'Employer',
      cancel: 'Cancel',
      modalMessage: 'Would you like to register now?',

      login_command: "I want to login",
      
      speechEnabled: "Speech mode enabled",
      welcomeMessage: "Welcome to SkillBazaar. For register, press the register button.",
      languageChanged: "Language changed to English.",
      modalSpeechInstruction: "If you are an employee, press the top button. If you are an employer, press the second button. If you want to stay on the welcome page, press the cancel button.",
      employeeNavigation: "Employee login page.",
      employerNavigation: "Employer login page.",

      // Profile Screen
      welcome: 'Welcome',
      myProfile: 'My Profile',
      favorites: 'Favorites',
      inbox: 'Inbox',
      logout: 'Logout',
      name: 'Name ',
      phone: 'Phone',

      logoutConfirmationTitle: "Logout",
      logoutConfirmationMessage: "Are you sure you want to logout?",
      cancel: "Cancel",
      yes: "Yes",

      //Login Screen
      sms_title: "SMS Permission",
      sms_message: "We need access to your SMS messages to auto-fill the OTP.",

      loginWithMobile: "Login with Mobile Number",
      enterMobile: "Enter Mobile Number (e.g., 03029614392)",
      sendOtp: "Send OTP",
      enterOtp: "Enter OTP",
      resendOtp: "Resend OTP",
      resendWait: "Resend OTP in 30s",
      login: "Login",
      invalidNumber: "Invalid Number",
      validNumberMessage: "Invalid Number. Please enter a valid 11-digit number starting with 03.",
      valid11Digit: "Please enter a valid 11-digit mobile number.",
      otpSent: "OTP Sent",
      yourOtpIs: "Your OTP is",
      otpAutofill: "OTP auto-filled!",
      loginSuccess: "Login Successful",
      successMessage: "You have been logged in successfully!",
      userTypeError: "User type is not recognized.",
      invalidOtp: "Invalid OTP. Please try again.",
      wait: "Wait",
      resendWaitMessage: "Please wait before resending the OTP.",
      smsError: "Error retrieving SMS.",
      otpNotFound: "OTP not found in the message.",
      invalidSmsFormat: "Message format is invalid.",
      smsListenerError: "Error in SMS Listener",

      
      //Employee Home Page
      welcome: "Welcome {{name}}",
      sms_permission_title: "SMS Permission",
      sms_permission_message: "We need access to your SMS messages to auto-fill the OTP.",
      categories: "Categories",
      available_jobs: "Available Jobs",
      create_profile: "Create Your Profile",
      home: "Home",
      saved: "Saved",
      messages: "Messages",
      profile: "Profile",
      bot: "Chat with Bot",
      no_document: "No such document!",
      error_fetching: "Error fetching user data",
      select_category: "Category selected: {{category}}",     
      driver: "Driver",
      plumber: "Plumber",
      gardener: "Gardener",
      truck_driver: "Truck Driver",
      electrician: "Electrician",
      mechanic: "Mechanic",
      carpenter: "Carpenter",
      

      // All jobs screen without category
      availableJobs: "Available Jobs",
      allJobs: "All Jobs",
      location: "Location",
      expectedPay: "Expected Pay",

      //Employer Profile
      //name: "John Doe",
      phoneNumber: "Phone Number",
      age: "Age",
      sex: "Sex",
      profession: "Profession",
      experience: "Experience",
      about: "About {{name}}",
      aboutText: "John is a skilled developer with expertise in mobile and web application development. He enjoys creating seamless user experiences.",
      homePage: "Home Page",
      //hireMe: "Home Page",


      //Create Profile Step 1
      "createProfile": "Create Your Profile",
      "step": "(Step {{step}} of {{totalSteps}})",
      "captureIdCard": "📸 Capture ID Card",
      "fullName": "Full Name *",
      "enterFullName": "Enter your full name",
      "gender": "Gender *",
      "selectGender": "Select Gender",
      "male": "Male",
      "female": "Female",
      "other": "Other",
      "cnicNumber": "CNIC Number *",
      "enterCnic": "Enter CNIC (13 digits)",
      "age": "Age *",
      "enterAge": "Enter your age",
      "saveContinue": "✅ Save & Continue",

      //create profle step 2
      createProfile: "Create Your Profile",
      step: "Step {{step}} of 6",
      professionQuestion: "What is your profession?",
      enterProfession: "Enter your profession",
      next: "Next",

      //creating profile step 3
      creatingProfile: "Creating Your Profile",
      step: "(Step {{step}} of 6)",
      cityQuestion: "Which City are you in?",
      enterCity: "Enter City You Live In",
      transcription: "Transcription:",
      next: "Next",

      //creating profile step 4
      creatingProfile: "Creating Your Profile",
      step: "(Step {{step}} of 6)",
      workExperience: "How many years of work experience do you have?",
      yearsOfExperience: "Years of Experience",
      transcription: "Transcription:",
      next: "Next",

      //creating profile step 5
      creatingProfile: "Creating Your Profile",
      step: "(Step {{step}} of 6)",
      motherLanguage: "What is your Mother Language?",
      enterMotherLanguage: "Enter Your Mother Language",
      transcription: "Transcription:",
      next: "Next",

      //creating profile step 6
      creatingProfile: "Creating Your Profile",
      step: "(Step {{step}} of 6)",
      aboutMe: "About Me",
      description: "Description",
      transcription: "Transcription:",
      submit: "SUBMIT",





    },
  },
  hi: {
    translation: {
      // Welcome Screen
      title: 'अपने सपनों की नौकरी खोजें',
      subtitle: 'आपके लिए तैयार हजारों नौकरी के अवसरों का पता लगाएं।',
      register: 'पंजीकरण करें',
      employee: 'कर्मचारी',
      employer: 'नियोक्ता',
      cancel: 'रद्द करें',
      modalMessage: 'क्या आप अभी पंजीकरण करना चाहेंगे?',

      welcomeMessage: "SkillBazaar में आपका स्वागत है। पंजीकरण के लिए, पंजीकरण बटन दबाएं।",
      languageChanged: "भाषा हिंदी में बदल दी गई है।",
      modalSpeechInstruction: "यदि आप कर्मचारी हैं, तो शीर्ष बटन दबाएं। यदि आप नियोक्ता हैं, तो दूसरे बटन को दबाएं।",
      employeeNavigation: "कर्मचारी लॉगिन पृष्ठ पर जा रहा है।",
      employerNavigation: "नियोक्ता लॉगिन पृष्ठ पर जा रहा है।",

      // Profile Screen
      welcome: 'स्वागत है',
      myProfile: 'मेरी प्रोफ़ाइल',
      favorites: 'पसंदीदा',
      inbox: 'इनबॉक्स',
      logout: 'लॉग आउट',
      name: 'नाम',
      phone: 'फ़ोन',

      //Login Screen
      loginWithMobile: "मोबाइल नंबर से लॉगिन करें",
      enterMobile: "मोबाइल नंबर दर्ज करें (जैसे, 03029614392)",
      sendOtp: "ओटीपी भेजें",
      enterOtp: "ओटीपी दर्ज करें",
      resendOtp: "ओटीपी पुनः भेजें",
      resendWait: "30 सेकंड में ओटीपी पुनः भेजें",
      login: "लॉगिन करें",
      invalidNumber: "अमान्य नंबर",
      valid11Digit: "कृपया एक वैध 11 अंकों का मोबाइल नंबर दर्ज करें।",
      otpSent: "ओटीपी भेजा गया",
      yourOtpIs: "आपका ओटीपी है",
      otpAutofill: "ओटीपी स्वतः भर दिया गया!",
      loginSuccess: "लॉगिन सफल",
      successMessage: "आपने सफलतापूर्वक लॉगिन कर लिया है!",
      userTypeError: "उपयोगकर्ता प्रकार को मान्यता नहीं दी गई।",
      invalidOtp: "अमान्य ओटीपी। कृपया पुनः प्रयास करें।",
      wait: "प्रतीक्षा करें",
      resendWaitMessage: "ओटीपी पुनः भेजने से पहले कृपया प्रतीक्षा करें।",
      smsError: "एसएमएस प्राप्त करने में त्रुटि।",
      otpNotFound: "संदेश में ओटीपी नहीं मिला।",
      invalidSmsFormat: "संदेश का प्रारूप अमान्य है।",
      smsListenerError: "एसएमएस श्रोता में त्रुटि",


    },
  },
  ur: {
    translation: {
      // Welcome Screen
      title: 'بہتر نوکری ڈھونڈیں بہتر نوکری بہتر آمدنی',
      subtitle: 'ہزاروں ملازمت کے مواقع تلاش کریں جو آپ کے لیے موزوں ہیں۔',
      register: 'رجسٹر کریں',
      employee: 'ملازم',
      employer: 'آجر',
      cancel: 'منسوخ کریں',
      modalMessage: 'کیا آپ ابھی رجسٹر کرنا چاہتے ہیں؟',

      login_command: "مجھے لاگ ان کریں",

      speechEnabled: "آواز کا موڈ فعال ہے",
      welcomeMessage: "SkillBazaar میں خوش آمدید۔ رجسٹر کرنے کے لئے، رجسٹر بٹن دبائیں۔",
      languageChanged: "زبان اردو میں تبدیل کر دی گئی ہے۔",
      modalSpeechInstruction: "اگر آپ ملازم ہیں تو اوپر والے بٹن کو دبائیں۔ اگر آپ آجر ہیں تو دوسرے بٹن کو دبائیں۔اگر آپ ویلکم پیج پر رہنا چاہتے ہیں تو منسوخ کریں بٹن دبائیں۔",
      employeeNavigation: "ملازم لاگ ان صفحہ۔",
      employerNavigation: "آجر لاگ ان صفحہ۔",
      
      // Profile Screen
      welcome: 'خوش آمدید',
      myProfile: 'میری پروفائل',
      favorites: 'پسندیدہ',
      inbox: 'ان باکس',
      logout: 'لاگ آوٹ',
      name: 'نام',
      phone: 'فون',

      logoutConfirmationTitle: "لاگ آؤٹ",
      logoutConfirmationMessage: "کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟",
      cancel: "منسوخ کریں",
      yes: "جی ہاں",

      //Login Screen
      sms_title: "ایس ایم ایس اجازت",
      sms_message: "ہمیں آپ کے ایس ایم ایس پیغامات تک رسائی کی ضرورت ہے تاکہ او ٹی پی خود بخود پُر ہو جائے۔",

      loginWithMobile: "موبائل نمبر کے ساتھ لاگ ان کریں",
      enterMobile: "موبائل نمبر درج کریں (مثلاً، 03029614392)",
      sendOtp: "او ٹی پی بھیجیں",
      enterOtp: "او ٹی پی درج کریں",
      resendOtp: "او ٹی پی دوبارہ بھیجیں",
      resendWait: "30 سیکنڈ میں او ٹی پی دوبارہ بھیجیں",
      login: "لاگ ان کریں",
      invalidNumber: "غلط نمبر",
      validNumberMessage: "غلط نمبر۔ براہ کرم 03 سے شروع ہونے والا 11 ہندسوں کا درست نمبر درج کریں۔",
      valid11Digit: "براہ کرم ایک درست 11 ہندسوں کا موبائل نمبر درج کریں۔",
      otpSent: "او ٹی پی بھیج دیا گیا",
      yourOtpIs: "آپ کا او ٹی پی ہے",
      otpAutofill: "او ٹی پی خود بخود پُر ہو گیا!",
      loginSuccess: "لاگ ان کامیاب",
      successMessage: "آپ کامیابی کے ساتھ لاگ ان ہو گئے ہیں!",
      userTypeError: "صارف کی قسم کو تسلیم نہیں کیا گیا۔",
      invalidOtp: "غلط او ٹی پی۔ براہ کرم دوبارہ کوشش کریں۔",
      wait: "انتظار کریں",
      resendWaitMessage: "براہ کرم او ٹی پی دوبارہ بھیجنے سے پہلے انتظار کریں۔",
      smsError: "ایس ایم ایس حاصل کرنے میں خرابی۔",
      otpNotFound: "پیغام میں او ٹی پی نہیں ملا۔",
      invalidSmsFormat: "پیغام کا فارمیٹ غلط ہے۔",
      smsListenerError: "ایس ایم ایس سننے والے میں خرابی",


      //Employee Home Page
      welcome: "خوش آمدید {{name}}",
      sms_permission_title: "ایس ایم ایس اجازت",
      sms_permission_message: "ہمیں آپ کے ایس ایم ایس پیغامات تک رسائی درکار ہے تاکہ OTP خود بخود بھر سکیں۔",
      categories: "اقسام",
      available_jobs: "دستیاب نوکریاں",
      create_profile: "اپنی پروفائل بنائیں",
      home: "ہوم",
      saved: "محفوظ کردہ",
      messages: "پیغامات",
      profile: "پروفائل",
      bot: "بوٹ کے ساتھ چیٹ کریں",
      no_document: "دستاویز موجود نہیں!",
      error_fetching: "صارف کا ڈیٹا حاصل کرنے میں خرابی",
      select_category: "منتخب شدہ کیٹیگری: {{category}}",      
      driver: "ڈرائیور",
      plumber: "پلمبر",
      gardener: "مالی",
      truck_driver: "ٹرک ڈرائیور",
      electrician: "الیکٹریشن",
      mechanic: "میکینک",
      carpenter: "ترکھان",
      

      // All jobs screen without category
      availableJobs: "دستیاب نوکریاں",
      allJobs: "تمام نوکریاں",
      location: "مقام",
      expectedPay: "متوقع تنخواہ",

      //Employer Profile
      name: "جان ڈو",
      phoneNumber: "فون نمبر",
      age: "عمر",
      sex: "جنس",
      profession: "پیشہ",
      experience: "تجربہ",
      about: "{{name}} کے بارے میں",
      aboutText: "جان ایک ماہر ڈویلپر ہے جو موبائل اور ویب ایپلیکیشن ڈیولپمنٹ میں مہارت رکھتا ہے۔ وہ ہموار صارف کے تجربات تخلیق کرنا پسند کرتا ہے۔",
      homePage: "ہوم پیج",
      hireMe: "ہوم پیج",

      //Create Profile Step 1
      "createProfile": "اپنی پروفائل بنائیں",
      "step": "(مرحلہ {{step}} از {{totalSteps}})",
      "captureIdCard": "📸 شناختی کارڈ کی تصویر کھینچیں",
      "fullName": "پورا نام *",
      "enterFullName": "اپنا پورا نام درج کریں",
      "gender": "جنس *",
      "selectGender": "جنس منتخب کریں",
      "male": "مرد",
      "female": "عورت",
      "other": "دیگر",
      "cnicNumber": "شناختی کارڈ نمبر *",
      "enterCnic": "شناختی کارڈ نمبر (13 ہندسوں کا) درج کریں",
      "age": "عمر *",
      "enterAge": "اپنی عمر درج کریں",
      "saveContinue": "✅ محفوظ کریں اور جاری رکھیں",

      //create profile step 2
      createProfile: "اپنی پروفائل بنائیں",
      step: "قدم {{step}} از 6",
      professionQuestion: "آپ کا پیشہ کیا ہے؟",
      enterProfession: "اپنا پیشہ درج کریں",
      next: "اگلا",

      //creating profile step 3
      creatingProfile: "اپنی پروفائل بنا رہے ہیں",
      step: "(قدم {{step}} از 6)",
      cityQuestion: "آپ کس شہر میں ہیں؟",
      enterCity: "وہ شہر درج کریں جہاں آپ رہتے ہیں",
      transcription: "تحریر:",
      next: "اگلا",

      //creating profile step 4
      creatingProfile: "اپنی پروفائل بنا رہے ہیں",
      step: "(قدم {{step}} از 6)",
      workExperience: "آپ کے پاس کتنے سال کا کام کرنے کا تجربہ ہے؟",
      yearsOfExperience: "تجربے کے سال",
      transcription: "تحریر:",
      next: "اگلا",

      //creating profile step 5
      creatingProfile: "اپنی پروفائل بنا رہے ہیں",
      step: "(قدم {{step}} از 6)",
      motherLanguage: "آپ کی مادری زبان کیا ہے؟",
      enterMotherLanguage: "اپنی مادری زبان درج کریں",
      transcription: "تحریر:",
      next: "اگلا",

      //creating profile step 6
      creatingProfile: "اپنی پروفائل بنا رہے ہیں",
      step: "(قدم {{step}} از 6)",
      aboutMe: "میرے بارے میں",
      description: "تفصیل",
      transcription: "تحریر:",
      submit: "جمع کریں",





    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes text
    },
  });

// Function to change language globally
export const changeLanguage = async (lang) => {
  try {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem('language', lang);
  } catch (error) {
    console.error('Error changing language:', error);
  }
};

// Load language from storage on app start
export const loadLanguage = async () => {
  try {
    const lang = await AsyncStorage.getItem('language');
    if (lang) {
      i18n.changeLanguage(lang);
    }
  } catch (error) {
    console.error('Error loading language:', error);
  }
};

export default i18n;
