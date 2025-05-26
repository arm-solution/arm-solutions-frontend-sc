import React, {useState} from 'react'

const PaySlipInputForm = (props) => {

  const [grossPay, setGrossPay] = useState("");
  const [additionalPays, setAdditionalPays] = useState([{ label: "", amount: "" }]);
  const [deductions, setDeductions] = useState([{ label: "", amount: "" }]);

  const handleAddRow = (type) => {
    const newRow = { label: "", amount: "" };
    if (type === "additional") {
      setAdditionalPays([...additionalPays, newRow]);
    } else {
      setDeductions([...deductions, newRow]);
    }
  };

  const handleChange = (index, field, value, type) => {
    const updater = type === "additional" ? [...additionalPays] : [...deductions];
    updater[index][field] = value;
    type === "additional" ? setAdditionalPays(updater) : setDeductions(updater);
  };

  const calculateFinalPay = () => {
    const addTotal = additionalPays.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);
    const dedTotal = deductions.reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);
    return (parseFloat(grossPay || 0) + addTotal - dedTotal).toFixed(2);
  };


  const removeRow = (index, type) => {
    const updated = type === "additional" ? [...additionalPays] : [...deductions];
    updated.splice(index, 1);
    type === "additional" ? setAdditionalPays(updated) : setDeductions(updated);
  };




  return (
    <>
    
    <div className="container my-4 p-4 bg-white border rounded shadow-sm">

            <div className="row">

            <div className="col-md-5">
                <div className="border rounded p-3 bg-light h-100">
                <h5>Employee Info</h5>
                <p><strong>Name:</strong> John Doe</p>
                <p><strong>Employee ID:</strong> 123456</p>
                <p><strong>Department:</strong> Finance</p>
                {/* Add more info if needed */}
                </div>
            </div>
            <div className="col-md-7">

            <form>
                {/* GROSS PAY */}
                <div className="mb-3 row align-items-center">
                    <label className="col-sm-3 col-form-label text-end">Gross Pay:</label>
                    <div className="col-sm-3">
                    <input
                        type="number"
                        className="form-control"
                        value={grossPay}
                        onChange={(e) => setGrossPay(e.target.value)}
                    />
                    </div>
                </div>

                {/* ADDITIONAL PAY */}
                <div className="mb-2 row align-items-center">
                    <label className="col-sm-3 col-form-label text-end">Additional Pay:</label>
                    <div className="col-sm-3">
                    <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => handleAddRow("additional")}
                    >
                        Add
                    </button>
                    </div>
                </div>

                {additionalPays.map((item, idx) => (
                    <div className="mb-2 row" key={`add-${idx}`}>
                    <div className="col-sm-3 offset-sm-3 mb-1 mb-sm-0">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Label"
                        value={item.label}
                        onChange={(e) => handleChange(idx, "label", e.target.value, "additional")}
                        />
                    </div>
                    <div className="col-sm-3 mb-1 mb-sm-0">
                        <input
                        type="number"
                        className="form-control"
                        placeholder="Amount"
                        value={item.amount}
                        onChange={(e) => handleChange(idx, "amount", e.target.value, "additional")}
                        />
                    </div>
                    <div className="col-sm-2">
                        <button
                        type="button"
                        className="btn btn-danger btn-sm w-100"
                        onClick={() => removeRow(idx, "additional")}
                        >
                        Remove
                        </button>
                    </div>
                    </div>
                ))}

                {/* DEDUCTIONS */}
                <div className="mb-2 row align-items-center">
                    <label className="col-sm-3 col-form-label text-end">Deductions:</label>
                    <div className="col-sm-3">
                    <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        onClick={() => handleAddRow("deduction")}
                    >
                        Add
                    </button>
                    </div>
                </div>

                {deductions.map((item, idx) => (
                    <div className="mb-2 row" key={`ded-${idx}`}>
                    <div className="col-sm-3 offset-sm-3 mb-1 mb-sm-0">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Label"
                        value={item.label}
                        onChange={(e) => handleChange(idx, "label", e.target.value, "deduction")}
                        />
                    </div>
                    <div className="col-sm-3 mb-1 mb-sm-0">
                        <input
                        type="number"
                        className="form-control"
                        placeholder="Amount"
                        value={item.amount}
                        onChange={(e) => handleChange(idx, "amount", e.target.value, "deduction")}
                        />
                    </div>
                    <div className="col-sm-2">
                        <button
                        type="button"
                        className="btn btn-danger btn-sm w-100"
                        onClick={() => removeRow(idx, "deduction")}
                        >
                        Remove
                        </button>
                    </div>
                    </div>
                ))}

                {/* FINAL PAY */}
                <div className="mb-3 row align-items-center">
                    <label className="col-sm-3 col-form-label text-end">Final Pay:</label>
                    <div className="col-sm-6">
                    <input type="text" className="form-control" value={calculateFinalPay()} readOnly />
                    </div>
                </div>
                </form>





            </div>

            </div>

            </div>
                
    
    </>
  )
}

export default PaySlipInputForm