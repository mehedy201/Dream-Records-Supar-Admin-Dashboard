import { IoEyeOutline } from 'react-icons/io5';
import userDemoImg from '../../assets/artists/artist4.png'
import localDate from '../../hooks/localDate';
import { Link } from 'react-router-dom';

const UserTable = ({ columns = [], data = [], renderCell }) => {
    return (
    <div className="table-wrapper">
      <table className="theme-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d._id}>
                <td>
                    <div className=" artistTable-img-row">
                        <img src={d?.photoURL ? d?.photoURL : userDemoImg} alt="" />
                        <p>{d.userName}</p>
                    </div>
                </td>
                <td>
                    <p>{d?.email}</p>
                </td>
                <td>
                    <div className={`status ${d?.status.toLowerCase()}`}>{d?.status}</div>
                </td>
                <td>
                    <p>{d?.openingDateISO ? localDate(d?.openingDateISO) : d?.openingDate ? localDate(d?.openingDate) : '--'}</p>
                </td>
                {
                    d?.status && d?.lastLogin &&
                    <td>
                        <p>{d?.status === 'Suspended' ? localDate(d?.userLockedDate) : d?.lastLogin ? localDate(d?.lastLogin) : ''} </p>
                    </td>
                }
                <td>
                    <Link
                        to={`/user/${d._id}`}
                        style={{ color: "#1C2024", textDecoration: "none" }}
                    >
                        <IoEyeOutline style={{ width: "24px", height: "24px" }} />
                    </Link>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;