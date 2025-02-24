export default function Plate(props: { violations: any[]; setIsCheked: (checked: boolean) => void }) {
  return (
    <div className="col-sm-12 col-md-6 mt-2" style={{ color: 'white', background: 'red' }}>
      {props.violations &&
        props.violations.map((vio: any, index: number) => (
          <div key={index} className="accordion" id={`accTicket${vio?.violationTicketNumber}`}>
            <div className="card">
              <div
                className="card-header p-1"
                style={{ background: '#eceae4', borderTop: '5px solid green' }}
                id={`hdr${vio?.violationTicketNumber}`}
              >
                <div className="row">
                  <div className="col-2 align-self-center">
                    <input
                      type="checkbox"
                      className="select-ticket"
                      onChange={(e) => props.setIsCheked(e.target.checked)}
                    />
                  </div>
                  <div className="col-10">
                    <div className="row m-0 p-0">
                      <div className="align-self-center m-2" style={{ color: '#000576' }}>
                        <b>رقم</b>: {vio?.violationTicketNumber || '2230013214'}
                      </div>
                    </div>
                  </div>
                  <div className="col-12" style={{ borderTop: '2px solid #d6dce5' }} />
                  <div className="col-12 m-0">
                    <a
                      style={{ color: '#000576' }}
                      href="#"
                      data-target={`#t${vio?.violationTicketNumber}`}
                      data-toggle="collapse"
                      aria-expanded="false"
                      aria-controls={`t${vio?.violationTicketNumber}`}
                    >
                      <div className="row m-0 p-0">
                        <div className="align-self-center m-2">
                          <b>قيمة المخالفات</b>: {vio?.violationAmount || 5} دك
                        </div>
                      </div>
                      <div className="row m-0 p-0">
                        <div className="align-self-center m-2">
                          <b>رقم اللوحة</b>: {vio?.vehiclePlateNumber ? vio.vehiclePlateNumber + '****' : '2*****1'}
                        </div>
                      </div>
                      <div className="row m-0 p-0">
                        <div className="align-self-center m-2">
                          <b>تاريخ المخالفة</b>: {vio?.violationDate}
                        </div>
                      </div>
                      <div className="row m-0 p-0">
                        <div className="col-12 text-left">
                          <i className="fas fa-angle-down" />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div
                id={`t${vio?.violationTicketNumber}`}
                className="collapse"
                aria-labelledby={`hdr${vio?.violationTicketNumber}`}
                data-parent={`#accTicket${vio?.violationTicketNumber}`}
              >
                <div className="card-body">
                  <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
