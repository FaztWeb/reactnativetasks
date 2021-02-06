import React from 'react';
import {Card, CardItem, Body, H3, Text} from 'native-base';

const TaskContent = (props) => {
  const {task} = props;
  return (
    <Card>
      <CardItem>
        <Body>
          <H3>{task.title}</H3>
          <Text>
            {task.description.length > 120
              ? `${task.description.substr(0, 120)}...`
              : task.description}
          </Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default TaskContent;
