/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { InputBase } from "@mui/material";

import PlaceCard from "components/PlaceCard/PlaceCard";
import PlaceInfoCard from "components/PlaceInfoCard/PlaceInfoCard";
import RouteCard from "components/RouteCard/RouteCard";
import SearchSettings from "components/SearchSettings/SearchSettings";

import { useAuth } from "hooks/useAuth";

import cultureIcon from "assets/icons/culture.svg";
import { ArrowLIcon, ArrowRIcon, SearchIcon } from "assets/icons";

import styles from "./AppDrawer.module.scss";
import { StyledBox, StyledButton } from "./styles";

interface IAppDrawerProps {
  isSearchDrawer?: boolean;
  isFavoriteDrawer?: boolean;
}

const AppDrawer = ({
  isSearchDrawer = false,
  isFavoriteDrawer = false,
}: IAppDrawerProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const { isAuth } = useAuth();

  const handleOpen = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    setOpen(isSearchDrawer || isFavoriteDrawer);
  }, [isSearchDrawer, isFavoriteDrawer]);

  return (
    <div className={`${styles.container}`}>
      <StyledBox className={isOpen ? styles.open : styles.containerClosed}>
        <div className={styles.inputWrapper}>
          <SearchIcon className={styles.svgIcon} />
          <InputBase className={styles.input} placeholder="Место, адрес.." />
        </div>
        <span className={styles.title}>
          {isSearchDrawer && "Искать:"}
          {isFavoriteDrawer && "Избранное:"}
        </span>
        {isAuth && isFavoriteDrawer ? (
          <PlaceCard
            description="Lörem ipsum jere. Intrabel peraktiv pävufåsk läslov pide. Exon prelogi. Någonstansare  begöpp. Homoadoption tesände keck såsom köttrymden. Epigen digon fast svennefiera håven postfaktisk. Atomslöjd defåling nigovena tegt i platt-tv. Sextremism julgranssyndrom. Rit-avdrag fyr, jukanat don. Apfälla menskopp eftersom spetät senessa inklusive mepaktiga. Bloggbävning makroligt spepp gönas. Sitskate epir tidsfönster. Hjärtslagslag defånera. Neck röstsamtal möbelhund. Hexaledes ryggsäcksmodellen hikikomori när stenomiheten täpos. Du kan vara drabbad."
            icon={cultureIcon}
            image={undefined}
            name="Фантаcмагарический музей им. П.М. Машерова"
          />
        ) : (
          <span
            className={isFavoriteDrawer ? styles.showText : styles.hideText}
          >
            Чтобы сохронять и просматривать список избранного необходимо
            авторизоваться
          </span>
        )}
        {/* <PlaceInfoCard
          image={undefined}
          icon={cultureIcon}
          name="Фантаcмагарический музей им. П.М. Машероваы"
          description="Lörem ipsum jere. Intrabel peraktiv pävufåsk läslov pide. Exon prelogi. Någonstansare  begöpp. Homoadoption tesände keck såsom köttrymden. Epigen digon fast svennefiera håven postfaktisk. Atomslöjd defåling nigovena tegt i platt-tv. Sextremism julgranssyndrom. Rit-avdrag fyr, jukanat don. Apfälla menskopp eftersom spetät senessa inklusive mepaktiga. Bloggbävning makroligt spepp gönas. Sitskate epir tidsfönster. Hjärtslagslag defånera. Neck röstsamtal möbelhund. Hexaledes ryggsäcksmodellen hikikomori när stenomiheten täpos. Du kan vara drabbad."
        /> */}
        {/* <RouteCard distance="1,1" time="40" /> */}
        {isSearchDrawer && <SearchSettings />}
      </StyledBox>
      <StyledButton
        className={isOpen ? styles.open : styles.buttonClosed}
        onClick={handleOpen}
      >
        {isOpen ? <ArrowLIcon /> : <ArrowRIcon />}
      </StyledButton>
    </div>
  );
};

export default AppDrawer;
