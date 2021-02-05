import React from 'react';
import {Card, CardItem, Body, H3, Text} from 'native-base';

const TaskContent = ({task}) => {
  return (
    <Card>
      <CardItem>
        <Body>
          <H3>{task.title}</H3>
          <Text>
            {task.content.length > 120
              ? `${task.content.substr(0, 120)}...`
              : task.content}
          </Text>
        </Body>
      </CardItem>
    </Card>
  );
};

export default TaskContent;
