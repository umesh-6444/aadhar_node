import { db } from "./db.js";

export const getAadharList = async (req, res) => {
  try {
    const { state, city, gender, dob, aadhar_number } = req.query;

    let sql = `
      SELECT 
        a.aadhar_number,
        a.first_name,
        a.last_name,
        a.gender,
        a.dob,
        s.state_name,
        c.city_name
      FROM aadhar_users a
      JOIN state_master s ON a.state_id = s.tid
      JOIN city_master c ON a.city_id = c.tid
      WHERE 1=1
    `;

    const params = [];

    if (aadhar_number) {
      sql += " AND a.aadhar_number = ? ";
      params.push(aadhar_number);
    }
    if (gender) {
      sql += " AND a.gender = ? ";
      params.push(gender);
    }
    if (dob) {
      sql += " AND a.dob = ? ";
      params.push(dob);
    }
    if (state) {
      sql += " AND s.state_name = ? ";
      params.push(state);
    }
    if (city) {
      sql += " AND c.city_name = ? ";
      params.push(city);
    }

    sql += " LIMIT 100";

    const [rows] = await db.execute(sql, params);

    res.json({
      total: rows.length,
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
