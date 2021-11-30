import React from 'react';
import styled from 'styled-components/macro';
import { Nationality } from 'models/Nationality';
import Checkbox from 'app/components/Checkbox';

interface Props {
  nationalities: Nationality[];
  onNationalitiesChanged: (nationalities: Nationality[]) => void;
}

const Container = styled.div`
  display: flex;
  background-color: white;
`;

const List = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  list-style: none;
  padding: 0;
  margin: 15px 0;
`;

const NationalitiesSelector = ({
  nationalities,
  onNationalitiesChanged,
}: Props) => {
  const onNationalityClicked = (selectedNationality: Nationality) => {
    const newNationalities = nationalities.map(nationality => {
      if (nationality.code !== selectedNationality.code) {
        return nationality;
      }

      return { ...nationality, isSelected: !selectedNationality.isSelected };
    });

    onNationalitiesChanged([...newNationalities]);
  };

  return (
    <Container>
      <List>
        {nationalities.map((nationality: Nationality) => {
          return (
            <ListItem key={nationality.code}>
              <Checkbox
                onClick={() => onNationalityClicked(nationality)}
                id={nationality.code}
                label={nationality.label}
                isChecked={nationality.isSelected}
              />
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default NationalitiesSelector;
