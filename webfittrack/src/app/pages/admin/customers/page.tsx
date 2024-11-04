// import { GetServerSideProps } from 'next';
// import { CustomTable } from "@/app/components/Table/Table";

// export async function getServerSideProps() {
//     const res = await fetch('https://fittrackapirepo.onrender.com/api/Goods');
//     const data = await res.json();


//     return {
//         props: { data },
//         revalidate: 60,
//     };
// }

// export default function Customers({ data }) {

//     return (
//         <>
//             <CustomTable  {...data} />
//         </>
//     );
// }

