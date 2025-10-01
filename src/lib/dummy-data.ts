
export const dummyDoctors = [
    {
      "doctorId": "DOC-001",
      "name": "Dr. Asha Rao",
      "specialty": "General Physician",
      "hospitalId": "HOS-001",
      "contact": "+919876543210",
      "waitTime": "15 mins",
      "rating": 4.6
    },
    {
      "doctorId": "DOC-002",
      "name": "Dr. Neha Singh",
      "specialty": "Gynecologist",
      "hospitalId": "HOS-002",
      "contact": "+919876543211",
      "waitTime": "30 mins",
      "rating": 4.8
    },
    {
      "doctorId": "DOC-003",
      "name": "Dr. Priya Desai",
      "specialty": "Endocrinologist",
      "hospitalId": "HOS-003",
      "contact": "+919876543212",
      "waitTime": "20 mins",
      "rating": 4.7
    },
    {
      "doctorId": "DOC-004",
      "name": "Dr. Alok Gupta",
      "specialty": "Orthopedic Surgeon",
      "hospitalId": "HOS-003",
      "contact": "+919876543214",
      "waitTime": "25 mins",
      "rating": 4.6
    },
    { "doctorId": "DOC-006", "name": "Dr. Neha Kapoor", "specialty": "Pulmonologist", "hospitalId": "HOS-001", "contact": "+911122223333", "waitTime": "20 mins", "rating": 4.8 },
    { "doctorId": "DOC-007", "name": "Dr. Amit Verma", "specialty": "General Physician", "hospitalId": "HOS-002", "contact": "+911133334444", "waitTime": "10 mins", "rating": 4.6 },
    { "doctorId": "DOC-008", "name": "Dr. Ritu Malhotra", "specialty": "Emergency Medicine", "hospitalId": "HOS-003", "contact": "+911144445555", "waitTime": "5 mins", "rating": 4.7 },
    { "doctorId": "DOC-009", "name": "Dr. Priya Singh", "specialty": "Dermatologist", "hospitalId": "HOS-005", "contact": "+911166667777", "waitTime": "15 mins", "rating": 4.5 },
    { "doctorId": "DOC-010", "name": "Dr. Rajesh Mehra", "specialty": "Cardiologist", "hospitalId": "HOS-004", "contact": "+919876543215", "waitTime": "40 mins", "rating": 4.9 }
]

export const dummyHospitals = [
    {
        "hospitalId": "HOS-001",
        "name": "Apollo Hospital",
        "location": "New Delhi, DL",
        "contact": "+911145678901",
        "patientLoad": "High",
        "coordinates": {"lat": 28.7041, "lng": 77.1025}
    },
    {
        "hospitalId": "HOS-002",
        "name": "Fortis Hospital",
        "location": "Mumbai, MH",
        "contact": "+912226206666",
        "patientLoad": "High",
        "coordinates": {"lat": 19.0760, "lng": 72.8777}
    },
    {
        "hospitalId": "HOS-003",
        "name": "AIIMS",
        "location": "Bangalore, KA",
        "contact": "+918022221111",
        "patientLoad": "Medium",
        "coordinates": {"lat": 12.9716, "lng": 77.5946}
    },
    {
        "hospitalId": "HOS-004",
        "name": "Medanta",
        "location": "Hyderabad, TS",
        "contact": "+914023607777",
        "patientLoad": "High",
        "coordinates": {"lat": 17.3850, "lng": 78.4867}
    },
    {
        "hospitalId": "HOS-005",
        "name": "Max Healthcare",
        "location": "Chennai, TN",
        "contact": "+914428282828",
        "patientLoad": "Medium",
        "coordinates": {"lat": 13.0827, "lng": 80.2707}
    }
]

export const dummyMedicines = [
    {"medicineId": "MED-001", "name": "Amlodipine", "composition": "Amlodipine Besylate 5mg", "costGovt": 5, "costPrivate": 25},
    {"medicineId": "MED-002", "name": "Metformin", "composition": "Metformin Hydrochloride 500mg", "costGovt": 3, "costPrivate": 15},
    {"medicineId": "MED-003", "name": "Aspirin", "composition": "Aspirin 75mg", "costGovt": 1, "costPrivate": 10},
    {"medicineId": "MED-004", "name": "Atorvastatin", "composition": "Atorvastatin Calcium 10mg", "costGovt": 8, "costPrivate": 50},
    {"medicineId": "MED-005", "name": "Levothyroxine", "composition": "Levothyroxine Sodium 50mcg", "costGovt": 10, "costPrivate": 60},
    {"medicineId": "MED-006", "name": "Paracetamol", "composition": "Paracetamol 500mg", "costGovt": 2, "costPrivate": 12},
    {"medicineId": "MED-007", "name": "Cetirizine", "composition": "Cetirizine Hydrochloride 10mg", "costGovt": 4, "costPrivate": 20},
    {"medicineId": "MED-008", "name": "Omeprazole", "composition": "Omeprazole 20mg", "costGovt": 6, "costPrivate": 35},
    {"medicineId": "MED-009", "name": "Salbutamol Inhaler", "composition": "Salbutamol Sulphate 100mcg/puff", "costGovt": 50, "costPrivate": 250},
    {"medicineId": "MED-010", "name": "Ibuprofen", "composition": "Ibuprofen 400mg", "costGovt": 5, "costPrivate": 30},
    {"medicineId": "MED-011", "name": "D-Rise", "composition": "Cholecalciferol 60000IU", "costGovt": 20, "costPrivate": 100},
    {"medicineId": "MED-012", "name": "Sumatriptan", "composition": "Sumatriptan Succinate 50mg", "costGovt": 15, "costPrivate": 80},
    {"medicineId": "MED-013", "name": "Clopidogrel", "composition": "Clopidogrel Bisulfate 75mg", "costGovt": 12, "costPrivate": 70},
    {"medicineId": "MED-014", "name": "Myo-Inositol", "composition": "Myo-Inositol 1000mg", "costGovt": 30, "costPrivate": 150},
    {"medicineId": "MED-015", "name": "Iron Folic Acid", "composition": "Ferrous Ascorbate 100mg, Folic Acid 1.5mg", "costGovt": 7, "costPrivate": 40},
    { "medicineId": "MED-016", "name": "Prednisolone", "composition": "Prednisolone 20mg", "costGovt": 10, "costPrivate": 45 },
    { "medicineId": "MED-017", "name": "Azithromycin", "composition": "Azithromycin 500mg", "costGovt": 25, "costPrivate": 120 },
    { "medicineId": "MED-018", "name": "Multivitamin", "composition": "Standard Multivitamin Complex", "costGovt": 15, "costPrivate": 90 }
];

export const dummyAmbulances = [
  {"id": "AMB-001", "vehicle_no": "MH-12-AB-1234", "driver_name": "Ravi Kumar", "driver_phone": "+919876500001", "status": "available", "current_coords": {"lat": 19.0860, "lng": 72.8877}, "speed_kmph": 60, "hospital_id": "HOS-001"},
  {"id": "AMB-002", "vehicle_no": "DL-3C-CD-5678", "driver_name": "Suresh Patel", "driver_phone": "+919876500002", "status": "available", "current_coords": {"lat": 28.7141, "lng": 77.1125}, "speed_kmph": 50, "hospital_id": "HOS-002"},
  {"id": "AMB-003", "vehicle_no": "TS-09-EF-9012", "driver_name": "Anil Yadav", "driver_phone": "+919876500003", "status": "on-trip", "current_coords": {"lat": 17.4050, "lng": 78.4967}, "speed_kmph": 70, "hospital_id": "HOS-003"},
  {"id": "AMB-004", "vehicle_no": "KA-01-GH-3456", "driver_name": "Sunil Reddy", "driver_phone": "+919876500004", "status": "available", "current_coords": {"lat": 12.9816, "lng": 77.6046}, "speed_kmph": 55, "hospital_id": "HOS-004"},
  {"id": "AMB-005", "vehicle_no": "MH-14-IJ-7890", "driver_name": "Vijay Singh", "driver_phone": "+919876500005", "status": "offline", "current_coords": {"lat": 18.5304, "lng": 73.8667}, "speed_kmph": 0, "hospital_id": "HOS-005"},
  {"id": "AMB-006", "vehicle_no": "MH-12-KL-2468", "driver_name": "Deepak Sharma", "driver_phone": "+919876500006", "status": "available", "current_coords": {"lat": 19.0660, "lng": 72.8677}, "speed_kmph": 45, "hospital_id": "HOS-001"},
  {"id": "AMB-007", "vehicle_no": "DL-3C-MN-1357", "driver_name": "Manoj Tiwari", "driver_phone": "+919876500007", "status": "on-trip", "current_coords": {"lat": 28.6941, "lng": 77.0925}, "speed_kmph": 65, "hospital_id": "HOS-002"},
  {"id": "AMB-008", "vehicle_no": "TS-09-OP-8642", "driver_name": "Rajesh Gupta", "driver_phone": "+919876500008", "status": "available", "current_coords": {"lat": 17.3750, "lng": 78.4767}, "speed_kmph": 58, "hospital_id": "HOS-003"},
  {"id": "AMB-009", "vehicle_no": "KA-01-QR-9753", "driver_name": "Naveen Gowda", "driver_phone": "+919876500009", "status": "offline", "current_coords": {"lat": 12.9616, "lng": 77.5846}, "speed_kmph": 0, "hospital_id": "HOS-04"},
  {"id": "AMB-010", "vehicle_no": "MH-14-ST-1928", "driver_name": "Prakash Joshi", "driver_phone": "+919876500010", "status": "available", "current_coords": {"lat": 18.5104, "lng": 73.8467}, "speed_kmph": 52, "hospital_id": "HOS-005"}
];

export const dummyPatients = [
  {
    "patientId": "P-102345",
    "name": "Rahul Sharma",
    "phone": "+919876543210",
    "email": "rahul.sharma@example.com",
    "dob": "1992-07-22",
    "gender": "Male",
    "aadhaar": "XXXX-XXXX-1234",
    "address": { "street": "45, Green Park", "city": "New Delhi", "state": "DL", "zip": "110016" },
    "bloodGroup": "O+",
    "healthOverview": {
      "status": "Good",
      "riskLevel": "Medium",
      "chronicConditions": "Mild asthma",
      "allergies": "Seasonal pollen (hay fever)",
      "latestNotes": "2025-09-28: BP borderline high; lifestyle measures advised. 2025-09-20: Occasional shortness of breath; spirometry advised."
    },
    "emergencyContact": { "name": "Priya Sharma", "phone": "+919888800001" },
    "insurance": { "provider": "Star Health", "policyId": "INS-A01" },
    "vitals": {
      "heartRate": [78, 80, 81, 79, 85, 82, 82],
      "bloodPressure": ["125/80","126/82","128/81","127/83","130/85","128/84","128/84"],
      "bloodSugar": [95, 98, 100, 97, 96, 99, 101],
      "oxygenSaturation": [97, 97, 98, 97, 96, 98, 97],
      "temperature": 36.7,
      "bmi": 24.3,
      "sleepHours": [6, 7, 6.5, 7, 6, 6.5, 7]
    },
    "lifestyle": {
      "smoking": "No",
      "alcohol": "Occasional social drinking",
      "exercise": "3-4 times/week (light jogging and yoga)",
      "diet": "Vegetarian, balanced diet",
    },
    "appointments": [
      {"appointmentId": "APP-001", "date": "2025-10-20T10:00:00Z", "doctorId": "DOC-006", "hospitalId": "HOS-001", "status": "booked", "urgent": false},
      {"appointmentId": "APP-002", "date": "2025-09-15T14:30:00Z", "doctorId": "DOC-007", "hospitalId": "HOS-002", "status": "completed", "urgent": false}
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [80, 81, 79, 82, 83, 81, 80], "bloodPressure": ["128/82","127/81","129/83","130/84","128/82","129/83","128/82"]},
      "appointmentProbability": [0.3,0.4,0.3,0.5,0.4,0.3,0.4],
      "medicationAdherence": [0.95,0.97,0.93,0.96,0.94,0.95,0.96],
      "risk": {
        "hypertension": "Medium",
        "diabetes": "Low",
        "heartDisease": "Medium"
      },
      "preventiveMeasures": "Daily 30 min cardio, Reduce refined sugar intake, Monthly BP checks."
    },
    "medicalEncounters": [
      {
        "encounterId": "ENC-001",
        "date": "2024-03-01",
        "department": "Pulmonology",
        "doctor": "Dr. Neha Kapoor",
        "reason": "Seasonal Asthma flare, shortness of breath, wheezing",
        "findings": "Wheezing, RR 18/min, SpO₂ 96%",
        "investigations": "Spirometry, Chest X-ray",
        "treatment": "Salbutamol inhaler 2 puffs PRN, Prednisolone 20 mg daily x5 days",
        "dischargeNotes": "Follow-up in 1 month. Outcome: Symptoms improved."
      },
      {
        "encounterId": "ENC-002",
        "date": "2025-01-15",
        "department": "General Medicine",
        "doctor": "Dr. Amit Verma",
        "reason": "Routine Annual Checkup",
        "findings": "BP 130/84, HR 80, BMI 24.1",
        "investigations": "Fasting glucose 92 mg/dL, Lipid profile, ECG",
        "treatment": "Lifestyle counseling (diet & exercise)",
        "dischargeNotes": "Monthly BP monitoring. Outcome: Stable."
      },
      {
        "encounterId": "ENC-003",
        "date": "2025-09-12",
        "department": "Emergency",
        "doctor": "Dr. Ritu Malhotra",
        "reason": "Acute shortness of breath after running",
        "findings": "Tachycardia 110 bpm, SpO₂ 95%",
        "investigations": "ECG, Peak flow, Chest auscultation",
        "treatment": "Nebulized bronchodilator, Observation 4 hours",
        "dischargeNotes": "Follow-up with Pulmonology if recurs. Outcome: Symptoms improved."
      },
      {
        "encounterId": "ENC-004",
        "date": "2025-09-28",
        "department": "Cardiology",
        "doctor": "Dr. Rajesh Mehra",
        "reason": "Follow-up for borderline high BP",
        "findings": "BP 128/84. No other significant findings.",
        "investigations": "2D Echocardiogram, Stress Test",
        "treatment": "Advised DASH diet, increase cardio exercise to 5x/week.",
        "dischargeNotes": "Re-check BP in 3 months. No medication needed at this time. Outcome: Monitoring."
      },
      {
        "encounterId": "ENC-005",
        "date": "2025-10-05",
        "department": "Dermatology",
        "doctor": "Dr. Priya Singh",
        "reason": "Minor skin rash on arm",
        "findings": "Mild contact dermatitis, likely from a new detergent.",
        "investigations": "None",
        "treatment": "Topical hydrocortisone cream 1% for 1 week.",
        "dischargeNotes": "Avoid new detergent. Follow-up if rash persists. Outcome: Improving."
      }
    ],
    "medications": {
      "current": [
        {"medicineId": "MED-009", "name": "Salbutamol Inhaler", "dosage": "100 mcg/puff, 2 puffs PRN", "reason": "Asthma (rescue)", "type": "current"},
        {"medicineId": "MED-018", "name": "Multivitamin", "dosage": "Once daily", "reason": "Supplement", "type": "current"}
      ],
      "past": [
        {"medicineId": "MED-016", "name": "Prednisolone", "dosage": "20 mg, 5 days, oral", "reason": "Asthma exacerbation", "type": "past"},
        {"medicineId": "MED-017", "name": "Azithromycin", "dosage": "500 mg, 3 days, oral", "reason": "Respiratory infection", "type": "past"}
      ],
      "otc": [
        {"name": "Paracetamol", "dosage": "500mg PRN", "reason": "Headache/Fever", "type": "otc"},
        {"name": "Cough lozenges", "dosage": "PRN", "reason": "Sore throat", "type": "otc"}
      ]
    },
    "investigations": [
      {"investigationId": "INV-001", "date": "2024-03-02", "type": "Spirometry", "summary": "Mild reversible obstructive pattern.", "doctor": "Dr. Neha Kapoor"},
      {"investigationId": "INV-002", "date": "2024-03-02", "type": "Chest X-ray", "summary": "Clear lung fields, no acute abnormalities.", "doctor": "Dr. Neha Kapoor", "imageUrl": "https://picsum.photos/seed/rad1/600/400"},
      {"investigationId": "INV-003", "date": "2025-01-16", "type": "Blood Test", "summary": "FBG 92 mg/dL; Lipid profile borderline.", "doctor": "Dr. Amit Verma"},
      {"investigationId": "INV-004", "date": "2025-09-12", "type": "ECG", "summary": "Transient sinus tachycardia; no ischemia.", "doctor": "Dr. Ritu Malhotra"},
      {"investigationId": "INV-005", "date": "2025-09-30", "type": "Ultrasound", "summary": "2D Echo: Structurally normal heart, EF 60%.", "doctor": "Dr. Rahul Mehra", "imageUrl": "https://picsum.photos/seed/rad2/600/400"},
      {"investigationId": "INV-006", "date": "2025-09-30", "type": "MRI", "summary": "Stress Test: Negative for inducible ischemia.", "doctor": "Dr. Rahul Mehra"}
    ],
    "vaccinations": ["COVID-19 (2 doses + booster)", "Tetanus (Up to date)", "Annual flu vaccine"],
    "carePlan": {
      "shortTerm": "Use inhaler PRN; peak flow twice daily for 2 weeks; follow-up Pulmonology if recurrence.",
      "longTerm": "30 min cardio 3-5x/week; reduce refined sugars; monthly BP checks; annual flu vaccine; up-to-date COVID boosters.",
      "nextFollowUp": "Pulmonology - 2025-10-20"
    },
    "currentStatus": {
      "clinicalStatus": "Stable with intermittent exertional dyspnea",
      "workRestrictions": "None; avoid smoke/dust"
    }
  },
  {
    "patientId": "PAT-20251001-0002",
    "name": "Anjali Verma",
    "phone": "+919999900002",
    "email": "anjali.verma@example.com",
    "dob": "1992-08-20",
    "gender": "Female",
    "aadhaar": "XXXX-XXXX-2345",
    "address": { "street": "45, GK-1", "city": "New Delhi", "state": "DL", "zip": "110048" },
    "bloodGroup": "A+",
    "healthOverview": {
      "status": "Good",
      "riskLevel": "Low",
      "chronicConditions": "Vitamin D deficiency",
      "allergies": "None",
      "latestNotes": "Follow-up for Vitamin D levels in 3 months."
    },
    "emergencyContact": { "name": "Rohan Verma", "phone": "+919888800002" },
    "insurance": { "provider": "ICICI Lombard", "policyId": "INS-B02" },
    "vitals": {
      "heartRate": [78, 80, 77, 79, 78, 80, 81],
      "bloodPressure": ["118/76","120/78","119/77","118/76","119/77","120/78","121/79"],
      "bloodSugar": [90, 92, 91, 93, 92, 94, 95],
      "oxygenSaturation": [96, 97, 96, 95, 97, 96, 97],
      "temperature": 36.8,
      "bmi": 22.1,
      "sleepHours": [7, 8, 7.5, 8, 7, 7.5, 8]
    },
     "lifestyle": {
      "smoking": "No",
      "alcohol": "No",
      "exercise": "5 times/week (Yoga and walking)",
      "diet": "Non-vegetarian, balanced diet",
    },
    "appointments": [
      {"appointmentId": "APP-003", "date": "2025-10-07T11:00:00Z", "doctorId": "DOC-002", "hospitalId": "HOS-002", "status": "booked", "urgent": false }
    ],
    "predictions": {
      "vitalsNext7Days": {"heartRate": [79,78,80,81,79,78,80], "bloodPressure": ["119/77","120/78","118/76","119/77","120/78","119/77","118/76"]},
      "appointmentProbability": [0.85,0.8,0.75,0.9,0.85,0.8,0.9],
      "medicationAdherence": [0.97,0.96,0.95,0.98,0.97,0.96,0.97],
      "risk": {
        "hypertension": "Low",
        "diabetes": "Low",
        "heartDisease": "Low"
      },
       "preventiveMeasures": "Continue Vitamin D supplements, regular sun exposure."
    },
    "medicalEncounters": [
        {"encounterId": "ENC-006", "date": "2025-09-15", "department": "General Medicine", "doctor": "Dr. Amit Verma", "reason": "Follow-up for Vitamin D deficiency.", "findings": "Levels improving.", "investigations": "Vitamin D test", "treatment": "Continue supplements", "dischargeNotes": "Re-check in 3 months."}
    ],
    "medications": {
        "current": [{"medicineId": "MED-011", "name": "D-Rise", "dosage": "1 tablet weekly", "reason": "Vitamin D deficiency", "type": "current"}],
        "past": [],
        "otc": []
    },
    "investigations": [
        {"investigationId": "INV-007", "date": "2025-09-15", "type": "Blood Test", "summary": "Vitamin D levels at 25 ng/mL (previously 10 ng/mL).", "doctor": "Dr. Amit Verma"}
    ],
    "vaccinations": ["COVID-19 (2 doses + booster)", "Tetanus (Up to date)"],
    "carePlan": {
        "shortTerm": "Continue Vitamin D supplement weekly.",
        "longTerm": "Annual health checkups.",
        "nextFollowUp": "General Medicine - 2025-12-15"
    },
    "currentStatus": {
        "clinicalStatus": "Stable and healthy",
        "workRestrictions": "None"
    }
  }
];

export type Patient = typeof dummyPatients[0];
export type Doctor = typeof dummyDoctors[0];
export type Hospital = typeof dummyHospitals[0];
export type Medicine = typeof dummyMedicines[0];
export type Ambulance = typeof dummyAmbulances[0];
export type MedicalEncounter = Patient["medicalEncounters"][0];
export type Investigation = Patient["investigations"][0];

    