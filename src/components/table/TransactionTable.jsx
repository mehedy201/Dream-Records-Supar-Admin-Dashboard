import PropTypes from "prop-types";
import upImg from '../../assets/icons/Received.png'
import downImg from '../../assets/icons/Withdrawn.png'
import localDate from "../../hooks/localDate";

const TransactionTable = ({ columns, data }) => {


    const handleReportDownloadExcel = async (masterUserId, date) => {
        try {
        const query = new URLSearchParams({ masterUserId, date }).toString();
        const response = await fetch(`http://localhost:5000/common/api/v1/analytics-and-balance/download?${query}`);

        if (!response.ok) {
            throw new Error('Download failed');
        }

        // Convert response to Blob and trigger download
        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `dreamrecords-${date}-reports.xlsx`;
        link.click();

        URL.revokeObjectURL(downloadUrl);
        } catch (error) {
        console.error('Download error:', error.message);
        alert('Could not download file');
        }
    };



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
                {
                  d?.type == 'Withdraw' ?
                  <div className={`transactions-type`}>
                    <img src={downImg} alt="" />
                    <p style={{ margin: "8px 0" }}>Withdrow {data?.type}</p>
                  </div> :
                  <div className={`transactions-type`}>
                    <img src={upImg} alt="" />
                    <p style={{ margin: "8px 0" }}>Received {data?.type}</p>
                  </div>
                }
              </td>
              <td>{d?.type === 'Withdraw' ? 
                <div className="modal-transaction-method">
                <p>{d?.bankInfo?.bank_name} {d?.bankInfo?.payoneerID ? `Payoneer`: ''}{d?.bankInfo?.paypalID ? `Paypal`: ''}{d?.bankInfo?.bKashName}</p>
                <small>{d?.bankInfo?.account_number && `************${d?.bankInfo?.account_number.slice(-4)}`} {d?.bankInfo?.payoneerEmail} {d?.bankInfo?.paypalEmail} {d?.bankInfo?.bKashNumber && d?.bankInfo?.bKashNumber.toSlice(-4)}</small>
              </div>
               : '—'}</td>
              <td>{d?.type === 'Withdraw' ? '-': '+'} € {d?.amount}</td>
              <td><span className={`status ${d?.type === 'Withdraw' ? d?.status.toLowerCase() : 'success'}`}>{d?.type === 'Withdraw' ? d?.status : 'Success'}</span></td>
              <td>{d?.type === 'Withdraw' ? localDate(d?.date) : d?.paymentReportDate}</td>
              <td>{d?.type === 'Withdraw'? <button style={{cursor: 'pointer'}} className="non-transjection-btn">Invoice</button> : <button style={{cursor: 'pointer'}} className="non-transjection-btn" onClick={() => handleReportDownloadExcel(d?.masterUserId, d?.paymentReportDate)}>Download Reports</button>}</td>
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