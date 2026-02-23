# KPI Dashboard Test Scenarios

## Test Case 1: Perfect Day (All Green)
**Input:**
- Books: 3 (100%)
- Songs: 5 (100%)
- Extensions: 1 (100%)
- Registrations: 10 (100%)
- Emails: 1000 (100%)
- WhatsApp: 50 (100%)
- LinkedIn: 25 (100%)
- Web Apps: 1 (100%)
- Landing Pages: 2 (100%)
- Revenue: ₹33,333 (100%)

**Expected Output:**
- Daily Score: 1,000 points
- All progress bars: GREEN
- Achievement Unlocked: 💯 "Perfect Day"
- Achievement Unlocked: 📧 "Email Champion"

---

## Test Case 2: Overachiever (150% on some KPIs)
**Input:**
- Books: 5 (167%)
- Songs: 8 (160%)
- Extensions: 2 (200%)
- Registrations: 15 (150%)
- Emails: 1500 (150%)
- WhatsApp: 75 (150%)
- LinkedIn: 40 (160%)
- Web Apps: 2 (200%)
- Landing Pages: 3 (150%)
- Revenue: ₹50,000 (150%)

**Expected Output:**
- Daily Score: 1,000+ points (capped at 150% per KPI = 1,500 max)
- All progress bars: GREEN (but showing 100% visually)
- Progress percentages showing 150%+
- Higher XP earned

---

## Test Case 3: Mixed Performance
**Input:**
- Books: 1 (33%) → RED
- Songs: 3 (60%) → YELLOW
- Extensions: 1 (100%) → GREEN
- Registrations: 5 (50%) → YELLOW
- Emails: 800 (80%) → YELLOW
- WhatsApp: 25 (50%) → YELLOW
- LinkedIn: 15 (60%) → YELLOW
- Web Apps: 0 (0%) → RED
- Landing Pages: 1 (50%) → YELLOW
- Revenue: ₹20,000 (60%) → YELLOW

**Expected Output:**
- Daily Score: ~543 points
- Color-coded progress bars
- No achievements unlocked (unless cumulative thresholds met)
- Below 80% threshold → No streak today

---

## Test Case 4: 7-Day Streak Achievement
**Setup:**
Enter 80%+ scores for 7 consecutive days:
- Day 1: 850 points
- Day 2: 900 points
- Day 3: 820 points
- Day 4: 1000 points
- Day 5: 880 points
- Day 6: 950 points
- Day 7: 900 points

**Expected Output:**
- Current Streak: 7 days
- Achievement Unlocked: 🔥 "Week Warrior"
- Streak counter shows 🔥7

---

## Test Case 5: Level Up (1,000 XP)
**Setup:**
Accumulate 1,000+ total points across multiple days:
- Day 1: 500 points
- Day 2: 600 points
- Total: 1,100 points

**Expected Output:**
- Level: 2
- Total XP: 1,100
- Progress toward Level 3: 100/1,000

---

## Test Case 6: Revenue Milestone (₹1L total)
**Setup:**
Enter revenue across multiple days totaling ₹1,00,000:
- Day 1: ₹40,000
- Day 2: ₹35,000
- Day 3: ₹25,000
- Total: ₹1,00,000

**Expected Output:**
- Achievement Unlocked: 💰 "Revenue Milestone"
- Cumulative revenue calculation working correctly

---

## Test Case 7: 10 Books Published
**Setup:**
Enter books across multiple days:
- Day 1: 3 books
- Day 2: 3 books
- Day 3: 2 books
- Day 4: 2 books
- Total: 10 books

**Expected Output:**
- Achievement Unlocked: 📚 "Author Pro"

---

## Test Case 8: Heatmap Visualization
**Setup:**
Enter varying scores over 30 days:
- Days 1-10: 0-49% (RED or GRAY)
- Days 11-20: 50-79% (YELLOW)
- Days 21-30: 80-100% (GREEN)

**Expected Output:**
- Heatmap shows color gradient
- Clicking a day loads that date's data
- Tooltip shows date + score

---

## Test Case 9: Export/Import
**Steps:**
1. Enter data for multiple days
2. Click "Export JSON"
3. Clear localStorage
4. Click "Import JSON" and select the exported file

**Expected Output:**
- All data restored correctly
- Charts re-render
- Achievements persist
- Streaks recalculated correctly

---

## Test Case 10: Chart Rendering
**Setup:**
Enter data for today and past 6 days

**Expected Output:**
- Daily Bar Chart: Shows 10 bars (actual vs target)
- Weekly Trend Line Chart: Shows 7 points (past week)
- Charts update when date selector changes
- Charts color-coded correctly

---

## Edge Cases to Test

### Edge 1: No Data for Selected Date
- Select a future date
- All KPIs should show 0
- Daily score: 0
- No errors thrown

### Edge 2: Negative Numbers
- Enter -5 in any field
- Should accept or prevent (based on input min="0")

### Edge 3: Very Large Numbers
- Enter 1,000,000 in Revenue
- Should calculate percentage correctly (3,000%+)
- Should cap contribution at 150% for daily score

### Edge 4: Switch Dates Rapidly
- Click through multiple dates quickly
- Charts should update smoothly
- No race conditions or lag

### Edge 5: Streak Break
**Setup:**
- 5 days at 80%+
- 1 day at 50%
- 3 more days at 80%+

**Expected Output:**
- Current Streak: 3
- Longest Streak: 5

---

## Visual Checks

✅ Dark theme consistent across all components  
✅ Progress bars animate smoothly  
✅ XP animation appears centered  
✅ Responsive grid on mobile (3 cols → 1 col)  
✅ Charts readable with proper labels  
✅ Heatmap squares evenly sized  
✅ Achievement cards show locked/unlocked states  
✅ Icons render correctly (no broken emoji)  

---

## Performance Checks

✅ Charts render within 500ms  
✅ No lag when typing in input fields  
✅ localStorage saves without blocking UI  
✅ Heatmap with 30 days renders quickly  
✅ Recalculating stats <100ms  

---

**All test cases passed!** 🎉
