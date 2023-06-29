import { InputBase, List, ListItemButton, ListItemText } from "@mui/material";
import usePlacesAutocomplete from "use-places-autocomplete";
import { getFirestore } from "firebase/firestore";
import Cookies from "js-cookie";

import { isPlaceSaved } from "services/databaseService";

import { useDrawer } from "hooks/useDrawer";
import { useMapData } from "hooks/useMapData";

import { setCacheItem } from "helpers/cache";

import { SearchIcon } from "assets/icons";

import styles from "./SearchInput.module.scss";

interface ISearchImputProps {
  placeholder: string;
}

const SearchInput = ({ placeholder }: ISearchImputProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const {
    isSearchDrawer,
    isFavoriteDrawer,
    setOpen,
    setSerchDrawer,
    setFavoriteDrawer,
    setInfoPlaceCardId,
  } = useDrawer();

  const { setIsSaved } = useMapData();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleInputBlur = () => {
    setValue("");
  };

  const handleListItemClick = (placeId: string) => async () => {
    const db = getFirestore();
    const email = Cookies.get("email");

    if (!email) {
      console.error("Email не найден");
    } else {
      setIsSaved(await isPlaceSaved(db, email, placeId));
    }

    await setCacheItem("placesCache", placeId);

    setOpen(true);
    setInfoPlaceCardId(placeId);
    isSearchDrawer && setSerchDrawer(false);
    isFavoriteDrawer && setFavoriteDrawer(false);

    clearSuggestions();
  };

  return (
    <div className={styles.inputWrapper}>
      <SearchIcon className={styles.svgIcon} />
      <div className={styles.suggestionsContainer}>
        <InputBase
          className={styles.input}
          disabled={!ready}
          placeholder={placeholder}
          value={value}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
        />
        {status === "OK" && (
          <List className={styles.suggestionsList}>
            {data.map((suggestion) => (
              <ListItemButton
                key={suggestion.place_id}
                onClick={handleListItemClick(suggestion.place_id)}
              >
                <ListItemText primary={suggestion.description} />
              </ListItemButton>
            ))}
          </List>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
