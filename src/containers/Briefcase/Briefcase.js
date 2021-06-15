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
  const { briefcaseSubmenuId } = useParams();

  const briefcase = {
    amount: 1000,
    someData: [],
  };

  useEffect(async () => {
    const securitiesKeys = Object.keys(securities);
    for (let securityKey of securitiesKeys) {
      let tickerString = "";
      for (let ticker of securities[securityKey].tickers) {
        tickerString += `${ticker},`;
      }

      let dataSecurity = await fetch(
        "https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote?symbols=" +
          tickerString,
        {
          headers: {
            "x-rapidapi-key":
              "a70d0b9072msh5b07905beb24538p18761bjsn718f790b01c0",
            "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
            useQueryString: true,
          },
        }
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
      dataSecurity = dataSecurity.quoteResponse.result;
      setComponents({
        securityKey: dataSecurity,
      });
    }
  }, []);

  const Component = useRedirect(
    components,
    "/briefcase/review",
    briefcaseSubmenuId,
    "review"
  );

  console.log(components);

  return (
    <Layout>
      <SideBar
        menuItems={subMenuBriefcase}
        activeMenuItem={`/briefcase/${briefcaseSubmenuId}`}
      />
      {briefcaseSubmenuId === "review" ? (
        <Component briefcaseCalculation={briefcase} />
      ) : (
        <Component />
      )}
    </Layout>
  );
};

export default Briefcase;
