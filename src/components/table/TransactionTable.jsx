import PropTypes from "prop-types";
import localDate from "../../hooks/localDate";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const TransactionTable = ({ columns, data }) => {


  const navigate = useNavigate();

    return (
        <div className="table-wrapper">
      <table className={`theme-table`}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((d) => (
            <tr key={d._id}>
              <td>
                {d?.userName}
              </td>
              <td>{d?.email ? d?.email : '-'}</td>
              <td>{d?.type === 'Withdraw' ? 
                <div className="modal-transaction-method">
                <p>{d?.bankInfo?.bank_name} {d?.bankInfo?.payoneerID ? `Payoneer`: ''}{d?.bankInfo?.paypalID ? `Paypal`: ''}{d?.bankInfo?.bKashName}</p>
                <small>{d?.bankInfo?.account_number && `************${d?.bankInfo?.account_number.slice(-4)}`} {d?.bankInfo?.payoneerEmail} {d?.bankInfo?.paypalEmail} {d?.bankInfo?.bKashNumber && d?.bankInfo?.bKashNumber.toSlice(-4)}</small>
              </div>
               : '—'}</td>
              <td>&#8377; {d?.amount}</td>
              <td>{localDate(d?.date)}</td>
              <td><span className={`status ${d?.type === 'Withdraw' ? d?.status.toLowerCase() : 'success'}`}>{d?.type === 'Withdraw' ? d?.status : 'Success'}</span></td>
              <td>
                  <IoEyeOutline
                    onClick={() => navigate(`/single-transaction/${d._id}/1/10`)}
                    style={{ width: "24px", height: "24px", color: "#838383", cursor: 'pointer' }}
                  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

TransactionTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TransactionTable;