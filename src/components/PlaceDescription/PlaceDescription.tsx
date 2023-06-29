import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Link,
  Rating,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PublicIcon from "@mui/icons-material/Public";

import { domainName } from "helpers/domainName";

import styles from "./PlaceDescription.module.scss";

interface IPlaceDescriptionProps {
  raiting: string | undefined;
  userRatingsTotal: string | undefined;
  address: string | undefined;
  isOpen?: boolean | undefined;
  schedule?: string[] | undefined;
  website?: string | undefined;
}

const PlaceDescription = ({
  raiting,
  userRatingsTotal,
  address,
  isOpen,
  schedule,
  website,
}: IPlaceDescriptionProps) => {
  return (
    <>
      {raiting && (
        <div className={styles.container}>
          <span className={styles.raiting}>{raiting}</span>
          <Rating
            readOnly
            name="read-only"
            precision={0.5}
            size="small"
            value={+raiting}
          />
          <span className={styles.raiting}>({userRatingsTotal})</span>
        </div>
      )}
      {address && (
        <div className={styles.container}>
          <PlaceIcon className={styles.icon} />
          <span className={styles.address}>{address}</span>
        </div>
      )}
      {isOpen && (
        <div className={`${styles.container} ${styles.scheduleContainer}`}>
          <AccessTimeIcon className={styles.icon} />
          {isOpen ? (
            <span className={styles.open}>Открыто</span>
          ) : (
            <span className={styles.close}>Закрыто</span>
          )}
          {schedule && (
            <Accordion className={styles.accordion}>
              <AccordionSummary
                className={styles.accordionSummary}
                expandIcon={<ExpandMoreIcon />}
              >
                Рабочие часы
              </AccordionSummary>
              <AccordionDetails className={styles.accordionDetails}>
                <ul>
                  {schedule.map((hours, index) => (
                    <li key={index}>{hours}</li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          )}
        </div>
      )}
      {website && (
        <div className={styles.container}>
          <PublicIcon className={styles.icon} />
          <Link className={styles.websiteLink} href={website} target="_blank">
            {domainName(website)}
          </Link>
        </div>
      )}
    </>
  );
};

export default PlaceDescription;
