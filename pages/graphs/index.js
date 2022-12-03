import Head from 'next/head';
import Chart from "../../components/Chart";



const chartIds = [
  "63627b5e-8dde-455c-8549-6dfa56c43c7a",
  "638a07a4-eca4-4b43-81bb-550f6ce019bc",
  "638a07a4-eca4-4cc1-8b6f-550f6ce019c2",
  "638a07a4-eca4-4329-8bf5-550f6ce019e4",
  "638a07a4-eca4-4911-856e-550f6ce019c0",
  "638a07a4-eca4-4f8b-83d0-550f6ce019e2",
  "638a07a4-eca4-4f8b-83d0-550f6ce019e2",
  "638a07a4-eca4-4e67-8651-550f6ce019c8",
  "638a07a4-eca4-493e-841b-550f6ce019ca",
  "638a07a4-eca4-41e5-83fd-550f6ce019c4",
  "638a07a4-eca4-4e39-8ec9-550f6ce019de",
  "638a07a4-eca4-451a-8456-550f6ce019cc",
  "638a07a4-eca4-4776-8531-550f6ce019da",
  "638a07a4-eca4-4822-89ec-550f6ce019dc",
  "638a07a4-eca4-4344-843f-550f6ce019d0",
  "638a07a4-eca4-4096-8522-550f6ce019e6",
  "638a07a4-eca4-490a-877e-550f6ce019e8",
]


const Index = () => {

    return (
          <div>
            <Head>
              <title>Graphs</title>
              <meta name="description" content="TSSPDCL" />
            </Head>
            <div className="count-card">
              <div className="card mt-3">
                <div className="card-body">
                    <div className="row">
                        {
                          chartIds.map((item,index) => (
                            <div className="col-lg-6" key={index}>
                              <Chart id={item}  name={`chart${index}`} filterId={index == 0 ? "ids" : null}  />
                            </div>
                          ))
                        }
                    </div>
                </div>
              </div>
            </div>
          </div>
    );
}

export default Index;
