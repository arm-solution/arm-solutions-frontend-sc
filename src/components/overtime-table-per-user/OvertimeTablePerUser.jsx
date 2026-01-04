import { formatDateReadable, formatDateTime, formatDateTimeReadableAlp  } from '../../customs/global/manageDates';
import './OvertimeTablePerUser.css';

const OvertimeTablePerUser = (props) => {

  // 🔥 FIX: data is already an array
  const data = props._getOtByUserId || [];

  return (
    <div className="card mt-5">
      <div className="card-body">

        <div className="card-header">
          Overtime from{' '}
          <b>
            {`${props.dateRangeStatus?.date_start
              ? formatDateReadable(props.dateRangeStatus?.date_start)
              : '---'} to ${props.dateRangeStatus?.date_end
              ? formatDateReadable(props.dateRangeStatus?.date_end)
              : '---'}`}
          </b>
        </div>

        <table className="table table-bordered mt-3">
          <thead className="table-success">
            <tr className="highlight-red">
              <th>Date/Time Start</th>
              <th>Date/Time End</th>
              <th>Total Hours</th>
              <th>Payable hrs.</th>
              <th>Status</th>
            </tr>
          </thead>

          {data.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="5" style={{ height: '100px', textAlign: 'center' }}>
                  <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    No Data Found
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {data.map(e => (
                <tr key={e.id} className={e?.total_hours < 8 ? 'highlight-red' : ''}>
                  <td>{e?.ot_date_time_start ? formatDateTimeReadableAlp(e.ot_date_time_start) : '---'}</td>
                  <td>{e?.ot_date_time_end ? formatDateTimeReadableAlp(e.ot_date_time_end) : '---'}</td>
                  <td>{e?.total_hours || 0}</td>
                  <td>{e?.hrs_payable || 0}</td>
                  <td>
                    {e?.status === 'for approval' ? (
                      <span className="badge bg-secondary">{e.status}</span>
                    ) : e?.status === 'approved' ? (
                      <span className="badge bg-success">{e.status}</span>
                    ) : (
                      <span className="badge bg-danger">{e.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default OvertimeTablePerUser;
