import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import Overview from "../../components/Overview/Overview";
import Securities from "../../components/Securities/Securities";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { subMenuBriefcase } from "../../data/sub_menu";
import securities from "../../data/briefcase/securities";
import { useRedirect } from "../../hooks/useRedirect";

const Briefcase = () => {
  const [components, setComponents] = useState({
    review: {
      component: Overview,
      data: securities,
    },
    currency: {
      component: Securities,
      data: securities.currency.data,
    },
    shares: {
      component: Securities,
      data: securities.shares.data,
    },
    bonds: {
      component: Securities,
      data: securities.bonds.data,
    },
    funds: {
      component: Securities,
      data: securities.funds.data,
    },
  });
  const [loading, setLoading] = useState(true);
  const { briefcaseSubmenuId } = useParams();

  const briefcase = {
    amount: 1000,
    someData: [],
  };

  useEffect(async () => {
    const securitiesKeys = Object.keys(securities);
    const dataSecurity = {
      review: {
        component: Overview,
        data:[],
      },
      currency: {
        component: Securities,
        data: [],
      },
      shares: {
        component: Securities,
        data: [],
      },
      bonds: {
        component: Securities,
        data: [],
      },
      funds: {
        component: Securities,
        data: [],
      },
    }
    for (let securityKey of securitiesKeys) {
      let tickerString = "";
      for (let ticker of securities[securityKey].tickers) {
        tickerString += `${ticker},`;
      }

      let securitiesInfo = await fetch(
        "https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote?symbols=" +
          tickerString,
        {
          headers: {
            "x-rapidapi-key":
              "ac7b597b45mshb7a6a40f5c1ead9p131c54jsn7802703f73cf",
            "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
            useQueryString: true,
          },
        }
      )
        .then((res) => res.json())
        // .then(json => console.log(json))
        .catch((err) => console.log(err));
      console.log(securitiesInfo)
      securitiesInfo  = securitiesInfo.quoteResponse.result;
      dataSecurity[securityKey].data = securitiesInfo;
      dataSecurity['review'].data.push(securitiesInfo);
    }
    setComponents(dataSecurity)
    setLoading(false);
  }, []);

  console.log(components);
  
  const Component = useRedirect(
    components,
    "/briefcase/review",
    briefcaseSubmenuId,
    "review"
  );

  return (
    <Layout>
      <SideBar
        menuItems={subMenuBriefcase}
        activeMenuItem={`/briefcase/${briefcaseSubmenuId}`}
      />
      {briefcaseSubmenuId === "review" ? (
        <Component briefcaseCalculation={briefcase}  loading={loading}/>
      ) : (
        <Component />
      )}
    </Layout>
  );
};

export default Briefcase;
