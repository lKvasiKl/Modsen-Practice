import { useState } from "react";
import {
  Button,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { PLACES } from "constants/searchSettingsConstants";

import styles from "./SearchSettings.module.scss";
import { SearchIcon } from "assets/icons";

const SearchSettings = () => {
  const [radius, setRadius] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(event.target.valueAsNumber);
  };

  return (
    <div className={styles.container}>
      <List className={styles.list}>
        {PLACES.map((place) => {
          return (
            <ListItem className={styles.listItem} key={place.placeName}>
              <ListItemButton
                className={styles.listItemButton}
                role={undefined}
                // onClick={handleToggle(place.isCheced)}
              >
                <img height="30px" src={place.icon} width="30px" />
                <ListItemText
                  className={styles.listItemText}
                  primary={place.placeName}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <div className={styles.inputContainer}>
        <span className={styles.text}>В радиусе:</span>
        <div className={styles.inputWrapper}>
          <Input
            className={styles.input}
            inputProps={{
              min: 1,
              max: 50,
            }}
            type="number"
            value={radius}
            onChange={handleChange}
          />
          <span className={styles.description}>км</span>
        </div>
        <Button className={styles.button}>
          <SearchIcon className={styles.icon} />
        </Button>
      </div>
    </div>
  );
};

export default SearchSettings;
