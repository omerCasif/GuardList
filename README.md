<div align="center">
    <h1>אפליקציית WEB ליצירת רשימות שמירה - iGuard</h1>
    <img src="https://github.com/omerCasif/GuardList/blob/main/iGuard%20logo.webp" width="70%" height="70%">
</div>

<h2>רקע</h2>
<p>
    כמו משרתי מילואים רבים גם אנחנו הוקפצנו בצו 8 בתאריך השביעי באוקטובר.
    מתאריך זה ועד היום, מנהלת מדינת ישראל "קרב הגנה" בגבולה הצפוני. בשבילנו, לוחמי החי"ר בקצה המשמעות של קרב הגנה היא תפיסת עמדות רלוונטיות בשטח, וביצוע יזומות כמו מארבים ופטרולים על קו הגדר.
    <br>
    במהלך תקופה זו הבנו את הצורך בתוכנת מחשב אשר תוכל לייצר את רשימת השמירה לטווח הזמן הרצוי, בהתאם לצורך המבצעי.
</p>

<br><br>
<h2>תיאור האפליקציה</h2>
<ul>
    <li>האתר בנוי בעיקר לשימוש בנייד, אך מותאם גם לשימוש ב PC.</li>
    <li>מנווטים באתר בעזרת ה SIDEBAR השמאלי.</li>
    <li>האתר עוצב בצורה פשוטה לתפעול, על מנת לעזור לכמה שיותר משתמשים פוטנציאליים.</li>
    <li>מתוך מחשבה על מידע שיכול להיות מסווג, האתר מצבע הצפנה ומידור בין משתמשים באמצעות שם משתמש וסיסמא יחודיים לכל אחד.</li>
    <li>לאחר הכנסת הקריטריונים הדרושים, התוכנה מוציאה את רשימת השמירה כפלט של STRING אותו ניתן לשתף בקלות בקבוצות הוואטאספ הרלוונטיות.</li>
    <li>על מנת ליצור הוגנות בין החיילים, התוכנה זוכרת בכל פעם מי האחרון ששמר ומחלקת את זמני השמירה בצורה שוויונית בין כולם.</li>
</ul>

<br><br>
<h2>דוגמאת הרצה</h2>
<p>
    דף כניסה ראשי.<br>
    שם משתמש: abc<br>
    סיסמא: 123
</p>

<div align="center">
    <img src="https://github.com/omerCasif/GuardList/blob/main/entry page.JPG" width="70%" height="70%">
</div>
<br>

<p>
    לאחר הכנסת פרטי הזיהוי יעבור המשתמש ל home page.<br>
    עמוד הבית כולל הסברים כללים על האפליקציה והוראות השימוש בה.
</p>

<div align="center">
    <img src="https://github.com/omerCasif/GuardList/blob/main/home page.JPG" width="70%" height="70%">
</div>
<br>

<p>
    במידה וזו הפעם הראשונה שהמשתמש מתחבר, הוא צריך להוסיף את האנשים הרלוונטיים לרשימת השמירה תחת העמוד של PEOPLE.<br>
    על מנת לשפר את הפונקציונאליות של האפליקציה ושתתאים לשימוש היומיומי, הוספנו את האפשרות לכלול אדם לרשימה הרלוונטית באמצעות סימון v, או לא לסמנו במידה והוא לא נכלל לסבב הנוכחי.
</p>

<div align="center">
    <img src="https://github.com/omerCasif/GuardList/blob/main/people.JPG" width="70%" height="70%">
</div>
<br>

<p>
    לאחר הוספת האנשים, צריך המשתמש להוסיף את עמדות השמירה הרלוונטיות תחת stations.
</p>

<div align="center">
    <img src="https://github.com/omerCasif/GuardList/blob/main/stations.JPG" width="70%" height="70%">
</div>
<br>

<p>
    לאחר מכן צריך המשתמש להגדיר את שעות הפעילות הרלוונטיות.
</p>

<div align="center">
    <img src="https://github.com/omerCasif/GuardList/blob/main/stations & time.JPG" width="70%" height="70%">
</div>
<br>

<p>
    לאחר הכנסת כל הפרמטרים האפליקציה תייצר את רשימת השמירה הרצויה, אותה ניתן להפיץ בצורה קלה ונוחה.
</p>

<div align="center">
    <img src="https://github.com/omerCasif/GuardList/blob/main/output.JPG" width="70%" height="70%">
</div>
<br>
<p>
    הפלט המתקבל:


</p>

```plaintext
*08:00*
שג:  Tal, Omer
פטרול:  Jhon

*11:00*
שג:  Bibi, Beni
פטרול:  Tal

*14:00*
שג:  Omer, Jhon
פטרול:  Bibi

*17:00*
שג:  Beni, Tal
פטרול:  Omer



