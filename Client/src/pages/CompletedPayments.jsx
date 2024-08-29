import React from 'react'

const tData = [
    {
        customerName: '567890',
        requestDate: '15/07/2024',
        requestType: 'Glass',
        weight: '5KG',
        requestAddress: '456 Elm St',
        fullAmount: 'RS - 1000.00',
        accountNumber: '987654',
        accountName: 'Kamal',
        bankName: 'BOC',
        branchCode: '4545'
    },
    {
        customerName:'123244',
        requestDate:'21/06/2024',
        requestType:'Plastic',
        weight:'2KG',
        requestAddress:'123 Main St',
        fullAmount:'RS - 400.00',
        accountNumber:'182349',
        accountName:'Anura',
        bankName:'Sampath',
        branchCode:'2312'
    }
]

export default function CompletedPayments() {
  return (
    <div className='bg-white px-4  pb-4 rounded-sm border border-grey-400 w-full'>

        <div className='mt-3'>
            <table className='w-full text-gray-700'>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Request Date</th>
                        <th>Request Type</th>
                        <th>Weight(KG)</th>
                        <th>Request Address</th>
                        <th>Full Amount</th>
                        <th>Account Number</th>
                        <th>Account Name</th>
                        <th>Bank Name</th>
                        <th>Branch Code</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {tData.map((route)=>(
                    <tr key={route.customerName}>
                        <td>{route.customerName}</td>
                        <td>{route.requestDate}</td>
                        <td>{route.requestType}</td>
                        <td>{route.weight}</td>
                        <td>{route.requestAddress}</td>
                        <td>{route.fullAmount}</td>
                        <td>{route.accountNumber}</td>
                        <td>{route.accountName}</td>
                        <td>{route.bankName}</td>
                        <td>{route.branchCode}</td>
                        <td>
                            <div className='flex flex-row gap-1'>
                                <button className='bg-red text-white px-4 py-2 hover:sky-green-700 rounded shadow-md outline-none border-none select-none'>
                                 Dounload
                                </button>
                            </div>
                            
                            
                        </td>
                    </tr>
                ))}

                </tbody>

            </table>

        </div>
    </div>
  )
}
