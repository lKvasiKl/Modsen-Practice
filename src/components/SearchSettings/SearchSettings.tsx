import { useState } from "react";
import {
  Button,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { getPlacesByType } from "services/placesServise";

import { useMapData } from "hooks/useMapData";

import getPlaceType from "helpers/placeNameToTypeMapper";

import { PLACES } from "constants/searchSettingsConstants";

import { SearchIcon } from "assets/icons";

import styles from "./SearchSettings.module.scss";

const SearchSettings = () => {
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const { position, radius, setRadius, setPlaces, setPageToken } = useMapData();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setRadius(event.target.valueAsNumber);
  };

  const handleListItemClick = (placeName: string) => () => {
    setSelectedPlaces((prevSelectedPlaces) => {
      if (prevSelectedPlaces.includes(placeName)) {
        setError("");
        return prevSelectedPlaces.filter((place) => place !== placeName);
      }

      if (prevSelectedPlaces.length >= 1) {
        setError("Можно выбрать не более 1 типа мест");
        return prevSelectedPlaces;
      }

      return [...prevSelectedPlaces, placeName];
    });
  };

  const fetchData = async () => {
    const types = selectedPlaces.map(getPlaceType).join("|");
    const filteredPlaces = await getPlacesByType(
      position,
      radius * 1000,
      types,
    );

    if (filteredPlaces.status === "ZERO_RESULTS") {
      setError(
        `По запросу ${selectedPlaces}, в радиусе ${radius} км, нет результатов.`,
      );
      return;
    }

    setPlaces(filteredPlaces.results);
    setPageToken(filteredPlaces.next_page_token);
  };

  const handleSearchButtonClick = async () => {
    await fetchData();
  };

  return (
    <div className={styles.container}>
      <List className={styles.list}>
        {PLACES.map((place) => {
          const isSelected = selectedPlaces.includes(place.placeName);
          const listItemClasses = `${styles.listItem} ${
            isSelected ? styles.selectedItem : ""
          }`;

          return (
            <ListItem className={listItemClasses} key={place.placeName}>
              <ListItemButton
                className={styles.listItemButton}
                role={undefined}
                onClick={handleListItemClick(place.placeName)}
              >
                <img alt="place" height="30px" src={place.icon} width="30px" />
                <ListItemText
                  className={styles.listItemText}
                  primary={place.placeName}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <div className={styles.errorContainer}>
        {error && <span className={styles.error}>{error}</span>}
      </div>
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
        <Button className={styles.button} onClick={handleSearchButtonClick}>
          <SearchIcon className={styles.icon} />
        </Button>
      </div>
    </div>
  );
};

export default SearchSettings;
