import * as React from 'react';
import {List} from 'react-native-paper';
import tw from '../../../../tailwind';

const AccordionComponent = ({value}) => {
  return (
    <>
      {value.map((item, index) => (
        <List.Accordion
          key={index}
          title={item.title}
          left={props => (
            <List.Icon {...props} icon="folder" style={tw`text-gray-500`} />
          )}
          style={tw`bg-accent-6 rounded-lg mb-2 overflow-hidden`}>
          <List.Item title={item.content} style={tw`py-3 px-4`} />
        </List.Accordion>
      ))}
    </>
  );
};

export default AccordionComponent;
