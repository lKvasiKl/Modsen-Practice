import { ArrowLIcon, SearchIcon } from "assets/icons";
import { StyledBox, StyledButton } from "./styles";
import { InputBase } from "@mui/material";
import cultureIcon from "../../assets/icons/culture.svg";

import styles from "./AppDrawer.module.scss";
import PlaceCard from "components/PlaceCard/PlaceCard";
import PlaceInfoCard from "components/PlaceInfoCard/PlaceInfoCard";
import RouteCard from "components/RouteCard/RouteCard";
import SearchSettings from "components/SearchSettings/SearchSettings";

interface IAppDrawerProps {
  title: string;
}

const AppDrawer = ({ title }: IAppDrawerProps) => {
  return (
    <div
      style={{ display: "flex", position: "relative", alignItems: "center" }}
    >
      <StyledBox>
        <div className={styles.inputWrapper}>
          <SearchIcon className={styles.svgIcon} />
          <InputBase className={styles.input} placeholder="Место, адрес.." />
        </div>
        <span className={styles.title}>{title}</span>
        {/* <PlaceCard
          image={undefined}
          icon={cultureIcon}
          name="Фантаcмагарический музей им. П.М. Машерова"
          description="Lörem ipsum jere. Intrabel peraktiv pävufåsk läslov pide. Exon prelogi. Någonstansare  begöpp. Homoadoption tesände keck såsom köttrymden. Epigen digon fast svennefiera håven postfaktisk. Atomslöjd defåling nigovena tegt i platt-tv. Sextremism julgranssyndrom. Rit-avdrag fyr, jukanat don. Apfälla menskopp eftersom spetät senessa inklusive mepaktiga. Bloggbävning makroligt spepp gönas. Sitskate epir tidsfönster. Hjärtslagslag defånera. Neck röstsamtal möbelhund. Hexaledes ryggsäcksmodellen hikikomori när stenomiheten täpos. Du kan vara drabbad."
        /> */}
        {/* <PlaceInfoCard
          image={undefined}
          icon={cultureIcon}
          name="Фантаcмагарический музей им. П.М. Машероваы"
          description="Lörem ipsum jere. Intrabel peraktiv pävufåsk läslov pide. Exon prelogi. Någonstansare  begöpp. Homoadoption tesände keck såsom köttrymden. Epigen digon fast svennefiera håven postfaktisk. Atomslöjd defåling nigovena tegt i platt-tv. Sextremism julgranssyndrom. Rit-avdrag fyr, jukanat don. Apfälla menskopp eftersom spetät senessa inklusive mepaktiga. Bloggbävning makroligt spepp gönas. Sitskate epir tidsfönster. Hjärtslagslag defånera. Neck röstsamtal möbelhund. Hexaledes ryggsäcksmodellen hikikomori när stenomiheten täpos. Du kan vara drabbad."
        /> */}
        {/* <RouteCard distance="1,1" time="40" /> */}
        <SearchSettings />
      </StyledBox>
      <StyledButton>
        <ArrowLIcon />
      </StyledButton>
    </div>
  );
};

export default AppDrawer;
