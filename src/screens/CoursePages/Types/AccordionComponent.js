import React, {useState} from 'react';
import {Accordion, AccordionItem, Layout, Text} from '@ui-kitten/components';

const AccordionComponent = ({value}) => {
  const [multipleSelect, setMultipleSelect] = useState(true);

  const renderAccordionHeader = headerContent => (
    <Text category="h6">{headerContent.title}</Text>
  );

  const renderAccordionContent = contentContent => (
    <Layout style={{padding: 16}}>
      <Text>{contentContent.content}</Text>
    </Layout>
  );

  return (
    <Accordion
      style={{marginVertical: 16}}
      multiple={multipleSelect}
      data={value}
      renderHeader={renderAccordionHeader}
      renderContent={renderAccordionContent}
    />
  );
};

export default AccordionComponent;
