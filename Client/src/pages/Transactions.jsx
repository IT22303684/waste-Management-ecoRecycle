import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'
import { HiCheckCircle } from 'react-icons/hi';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Styles for PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 10 },
  section: { margin: 10, padding: 10 },
  row: { flexDirection: 'row', marginBottom: 5 },
  label: { width: 150 },
  value: { flex: 1 },
});

// PDF Document component
const PaymentPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Payment Details</Text>
      <View style={styles.section}>
        {Object.entries(data).map(([key, value]) => (
          <View style={styles.row} key={key}>
            <Text style={styles.label}>{key}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export const loader = async () => {
  try {
    const paymentResponse = await customFetch.get("/payments");
    return { payments: paymentResponse.data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return { data: [] };
  }
}

export default function Transactions() {
  const { payments } = useLoaderData();
  const handleDownloadPDF = async (payment) => {
    const data = {
      customerName: payment?.user[0]?.name,
      requestDate: new Date(payment.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      requestType: payment?.category,
      weight: payment?.weight,
      fullAmount: payment?.amount,
      accountNumber: payment?.bank[0]?.accountName,
      accountName: payment?.bank[0]?.accountNumber,
      bankName: payment?.bank[0]?.bankName,
      branchCode: payment?.bank[0]?.branchCode,
    };

    const pdfBlob = await pdf(<PaymentPDF data={data} />).toBlob();
    saveAs(pdfBlob, `payment_details_${payment?.name}.pdf`);
  };

  return (
    <div className='bg-white px-4  pb-4 rounded-sm border border-gray-200 w-full  pt-3'>
      <strong className=' font-medium text-xl text-green-600'>Payments</strong>

      <div className='mt-3'>
        <table className='w-full text-gray-700'>
          <thead>
            <tr>
              <th className='text-left p-2'>Date</th>
              <th className='text-left p-2'>Customer</th>
              <th className='text-left p-2'>Item</th>
              <th className='text-left p-2'>Weight (KG)</th>
              <th className='text-left p-2'>Full Amount</th>
              <th className='text-left p-2'>Payment Status</th>
              <th className='text-left p-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{new Date(payment.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                <td>{payment.user[0].name}</td>
                <td>{payment.category}</td>
                <td>{payment.weight}</td>
                <td>{payment.amount}</td>
                <td>
                  {payment.status === 'Success' ? (
                    <div className='flex items-center'>
                      Done <HiCheckCircle className='ml-1 text-green-500' />
                    </div>
                  ) : (
                    payment.status
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDownloadPDF(payment)}
                    className="ml-3 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 text-xs"
                  >
                    Download PDF
                  </button>
                </td>
                <td>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  )
}