import { useState, useMemo, useEffect } from "react";
import { getUsers, createUser, updateUser } from "../../services/user.service";
import StaffForm from "../../components/admin/StaffForm";
import "../../assets/style/admin/staff.css";

export default function StaffPage() {
  const [staffs, setStaffs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    const res = await getUsers("staff");
    setStaffs(res.data.data);
  };

  const filtered = useMemo(() => {
    return staffs.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [staffs, search]);

  const handleSubmit = async (data) => {
    if (selected) {
      await updateUser(selected._id, data);
    } else {
      await createUser(data);
    }

    fetchStaffs();
    setSelected(null);
  };

  const handleToggle = async (id, current) => {
    await updateUser(id, { isActive: !current });
    fetchStaffs();
  };

  return (
    <div className="staff-page">
      <h2>Nhân viên</h2>

      <input
        placeholder="Tìm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="content">
        <div className="left">
          <table>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.role}</td>
                  <td>{s.isActive ? "Active" : "Blocked"}</td>

                  <td>
                    <button onClick={() => setSelected(s)}>Edit</button>

                    <button
                      onClick={() => handleToggle(s._id, s.isActive)}
                    >
                      {s.isActive ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="right">
          <StaffForm selected={selected} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}