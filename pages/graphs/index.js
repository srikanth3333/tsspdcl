import Head from 'next/head';
import Chart from "../../components/Chart";
import {getBoardName} from "../../utils/getBoard";

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

const chartIdsTsn = [
  "639189cb-c44a-405b-89b3-395721d2352e",
  "639189cb-c44a-491d-8b4f-395721d23530",
  "639189cb-c44a-486b-8622-395721d2352a",
  "639189cb-c44a-48dc-8b4a-395721d23526",
  "639189cb-c44a-42dc-8645-395721d2352c",
  "639189cb-c44a-4f5c-81c4-395721d23534",
  "639189cb-c44a-4fcb-83f8-395721d23518",
  "639189cb-c44a-4bdc-8f0f-395721d23532",
  "639189cb-c44a-4ee2-8d67-395721d23524",
  "639189cb-c44a-4f92-8107-395721d2351e",
  "639189cb-c44a-4efd-8d99-395721d23522",
  "639189cb-c44a-49d3-8acd-395721d23536",
  "639189cb-c44a-4e4f-8b10-395721d23520",
  "639189cb-c44a-4566-80d2-395721d23538",
  "639189cb-c44a-4feb-8ebe-395721d2351a",
  "639189cb-c44a-45cd-8db9-395721d23528",
]


const Index = () => {

    let boardCode = getBoardName();

    console.log(boardCode)

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
                          boardCode != "TSNPDCL" ? chartIds.map((item,index) => (
                            <div className="col-lg-6" key={index}>
                              <Chart id={item}  name={`chart${index}`} filterId={index == 0 ? "ids" : null}  />
                            </div>
                          )) : chartIdsTsn.map((item,index) => (
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
