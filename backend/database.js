const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'cms.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create Tables
    db.serialize(() => {
      // Key-value store for Ads Banner
      db.run(`CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
      )`);

      // Table for Camps
      db.run(`CREATE TABLE IF NOT EXISTS camps (
        id TEXT PRIMARY KEY,
        data TEXT
      )`);

      initializeDefaultData();
    });
  }
});

function initializeDefaultData() {
  // Check if ads banner exists
  db.get("SELECT key FROM settings WHERE key = 'ads_banner'", (err, row) => {
    if (!row) {
      const defaultAdsBanner = {
        tagline: 'ปิดรับสมัครทันทีที่จำนวนครบ',
        title: 'ค่าโครงการ 2 สัปดาห์',
        price: 48900,
        originalPrice: 52900,
        badgeLabel: 'ราคา EARLY BIRD',
        discountText: 'ประหยัดทันที ฿4,000',
        rounds: [
          { name: 'รอบตุลาคม', deadline: 'สมัครก่อน 30 มิ.ย. 2026' },
          { name: 'รอบธันวาคม', deadline: 'สมัครก่อน 31 ส.ค. 2026' }
        ],
        ctaText: 'สมัครเรียนเลย',
        backgroundImageUrl: '/assets/images/Ads-Banner.png'
      };
      db.run("INSERT INTO settings (key, value) VALUES (?, ?)", ['ads_banner', JSON.stringify(defaultAdsBanner)]);
      console.log('Inserted default Ads Banner data');
    }
  });

  // Check if camps exist
  db.get("SELECT COUNT(*) as count FROM camps", (err, row) => {
    if (row && row.count === 0) {
      const defaultCamps = [
        {
          id: 'summer-camp',
          name: 'รอบมิถุนายน | ระยะ 2 สัปดาห์',
          type: 'summer',
          title: 'SUMMER CAMP',
          duration: '2 สัปดาห์',
          startDate: 'วันที่ -',
          endDate: '',
          registrationRange: 'ปิดรับสมัครแล้ว',
          status: 'closed',
          statusText: 'ปิดรับสมัครแล้ว',
          price: 48900,
          originalPrice: 52900
        },
        {
          id: 'autumn-camp',
          name: 'รอบตุลาคม | ระยะ 2 สัปดาห์',
          type: 'autumn',
          title: 'AUTUMN CAMP',
          duration: '2 สัปดาห์',
          startDate: '11 ตุลาคม 2026',
          endDate: '24 ตุลาคม 2026',
          registrationRange: 'วันนี้ - 31 ก.ค. 2026',
          status: 'open',
          statusText: 'เปิดรับสมัคร วันนี้ - 31 ก.ค. 2026',
          price: 48900,
          originalPrice: 52900
        },
        {
          id: 'winter-camp',
          name: 'รอบธันวาคม | ระยะ 2 สัปดาห์',
          type: 'winter',
          title: 'WINTER CAMP',
          duration: '2 สัปดาห์',
          startDate: '06 ธันวาคม 2026',
          endDate: '19 ธันวาคม 2026',
          registrationRange: 'วันนี้ - 30 ก.ย. 2026',
          status: 'open',
          statusText: 'เปิดรับสมัคร วันนี้ - 30 ก.ย. 2026',
          price: 48900,
          originalPrice: 52900
        }
      ];

      const stmt = db.prepare("INSERT INTO camps (id, data) VALUES (?, ?)");
      defaultCamps.forEach(camp => {
        stmt.run(camp.id, JSON.stringify(camp));
      });
      stmt.finalize();
      console.log('Inserted default Camps data');
    }
  });
}

module.exports = db;
