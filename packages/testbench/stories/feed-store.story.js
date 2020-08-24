//
// Copyright 2020 DXOS.org
//

import clsx from 'clsx';
import ColorHash from 'color-hash';

import React, { useEffect, useState, useReducer } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { select } from '@storybook/addon-knobs';

import { createId } from '@dxos/crypto';
import { truncateString } from '@dxos/debug';
import { FeedStore } from '@dxos/feed-store';
import {
  createStorage, STORAGE_RAM, STORAGE_IDB, STORAGE_CHROME, STORAGE_FIREFOX
} from '@dxos/random-access-multi-storage';

const colorHash = new ColorHash({ saturation: [0.7, 0.7, 0.7] });

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0
  },

  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },

  table: {
    tableLayout: 'fixed'
  },

  topic: {
    marginLeft: theme.spacing(2)
  },

  heading: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
  },

  mono: {
    fontFamily: 'monospace',
    fontSize: 14
  },

  feed: {
    display: 'flex',
    alignItems: 'center'
  },
  feedLength: {
    minWidth: 50
  },
  blocks: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  block: {
    display: 'block',
    width: 16,
    height: 16,
    marginRight: 2,
    marginTop: 1,
    marginBottom: 1
  },

  colOpen: {
    width: 80
  },
  colPath: {
    width: 150
  },
  colMetadata: {
    width: 150
  },
  colBlocks: {
  },
  colActions: {
    width: 60
  }
}));

const FeedStoreStory = ({ feedStore }) => {
  const classes = useStyles();

  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [topic, setTopic] = useState('text');
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    feedStore.initialize().then(() => {
      forceUpdate();
    });
  }, []);

  const handleRefresh = () => {
    forceUpdate();
  };

  const handleClear = async () => {
    try {
      await feedStore.close();
    } catch (err) {
      console.error(err);
    }

    if (feedStore.storage.destroy) {
      await feedStore.storage.destroy();
    }

    forceUpdate();
  };

  const handleToggleOpen = async () => {
    if (feedStore.opened) {
      await feedStore.close();
    } else {
      await feedStore.initialize();
    }

    forceUpdate();
  };

  const handleCreateFeed = async () => {
    const path = createId();

    // TODO(burdon): Create should be different from open (since cannot change options after created?)
    await feedStore.openFeed(path, { metadata: { topic } });

    forceUpdate();
  };

  const handleOpenFeeds = async () => {
    await Promise.all(feedStore.getDescriptors().map(({ path, metadata }) => {
      return (metadata.topic === topic) && feedStore.openFeed(path);
    }));

    forceUpdate();
  };

  const handleCreateStream = async () => {
    const filter = ({ metadata = {} }) => metadata.topic === topic;
    const stream = feedStore.createReadStream(feed => filter(feed) && ({ live: true, feedStoreInfo: true }));

    const subscription = {
      id: createId(),
      topic,
      stream,
      blocks: [],
      open: true
    };

    stream.on('data', (message) => {
      const { path, seq, data } = message;
      subscription.blocks.push({ path, id: `${path}/${seq}`, data });
      forceUpdate();
    });

    // TODO(burdon): Closing any feed kills the stream.
    stream.on('close', () => {
      subscription.open = false;
      forceUpdate();
    });

    setSubscriptions([...subscriptions, subscription]);
  };

  const handleToggleFeed = async (descriptor) => {
    // TODO(burdon): attr should be 'open' (method hidden).
    const { path, opened } = descriptor;

    if (opened) {
      // TODO(burdon): Seems to reset feed (if RAM?)
      await feedStore.closeFeed(path);
    } else {
      await feedStore.openFeed(path);
    }

    forceUpdate();
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const Feeds = ({ blocks = [] }) => {
    return (
      <div className={classes.feed}>
        <Typography className={clsx(classes.mono, classes.feedLength)}>{blocks.length}</Typography>

        <div className={classes.blocks}>
          {[...blocks].map(({ path, id }) => (
            <div
              className={classes.block}
              style={{ backgroundColor: colorHash.hex(path) }}
              key={id}
              title={id}
            />
          ))}
        </div>
      </div>
    );
  };

  // TODO(burdon): Returns empty list until first feed is opened?
  const descriptors = feedStore.getDescriptors().map(descriptor => {
    const { feed, path, opened, metadata } = descriptor;

    const handleAppend = () => {
      const data = {
        id: createId
      };

      feed.append(data, () => {
        forceUpdate();
      });
    };

    // TODO(burdon): Closing a feed kills the stream, but deleting one does NOT.
    const handleDelete = async () => {
      await feedStore.deleteDescriptor(path);
      forceUpdate();
    };

    // TODO(burdon): Actually get data and key.
    const blocks = [...new Array(feed ? feed.length : 0)].map((data, i) => ({ path, id: `${path}/${i}` }));

    return (
      <TableRow key={path}>
        <TableCell>
          <Switch
            checked={opened}
            onChange={() => handleToggleFeed(descriptor)}
          />
        </TableCell>
        <TableCell>
          <Typography className={classes.mono}>{truncateString(path, 6)}</Typography>
        </TableCell>
        <TableCell>
          <Typography className={classes.mono}>{JSON.stringify(metadata)}</Typography>
        </TableCell>
        <TableCell>
          <Feeds blocks={blocks} />
        </TableCell>
        <TableCell>
          <IconButton onClick={handleAppend} size='small' title='Append'>
            <AddIcon fontSize='small' />
          </IconButton>
          <IconButton onClick={handleDelete} size='small' title='Append'>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  const streams = subscriptions.map(({ id, open, topic, blocks }) => {
    return (
      <TableRow key={id}>
        <TableCell>
          <Switch
            disabled
            checked={open}
          />
        </TableCell>
        <TableCell />
        <TableCell>
          <Typography className={classes.mono}>{JSON.stringify({ topic })}</Typography>
        </TableCell>
        <TableCell>
          <Feeds blocks={blocks} />
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar} variant='dense'>
        <div>
          <Button
            className={classes.button}
            variant='contained'
            size='small'
            onClick={handleCreateFeed}
            color='primary'
          >
            Create Feed
          </Button>
          <Button
            className={classes.button}
            variant='contained'
            size='small'
            onClick={handleOpenFeeds}
          >
            Open Feeds
          </Button>
          <Button
            className={classes.button}
            variant='contained'
            size='small'
            onClick={handleCreateStream}
          >
            Create Stream
          </Button>
          <TextField className={classes.topic} defaultValue='test' onChange={handleTopicChange} />
        </div>

        <div>
          <Button className={classes.button} size='small' onClick={handleClear}>Clear</Button>
          <Button className={classes.button} size='small' onClick={handleRefresh}>Refresh</Button>
          <Switch
            checked={feedStore.opened}
            onChange={handleToggleOpen}
          />
        </div>
      </Toolbar>

      <div>
        <Typography variant='h6' className={classes.heading}>Feeds</Typography>
        <Table stickyHeader size='small' className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.colOpen}>Open</TableCell>
              <TableCell className={classes.colPath}>Path</TableCell>
              <TableCell className={classes.colMetadata}>Metadata</TableCell>
              <TableCell className={classes.colBlocks}>Blocks</TableCell>
              <TableCell className={classes.colActions} />
            </TableRow>
          </TableHead>
          <TableBody>
            {descriptors}
          </TableBody>
        </Table>
      </div>

      <div>
        <Typography variant='h6' className={classes.heading}>Streams</Typography>
        <Table stickyHeader size='small' className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.colOpen}>Open</TableCell>
              <TableCell className={classes.colPath} />
              <TableCell className={classes.colMetadata}>Filter</TableCell>
              <TableCell className={classes.colBlocks}>Blocks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {streams}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// TODO(burdon): Provide encoding option.
export const factory = (root = 'test', valueEncoding = 'json') => {
  const type = select('Store', [STORAGE_RAM, STORAGE_IDB, STORAGE_CHROME, STORAGE_FIREFOX], STORAGE_IDB);

  const storage = createStorage(root, type);

  const feedStore = new FeedStore(storage, { feedOptions: { valueEncoding } });

  return <FeedStoreStory feedStore={feedStore} />;
};
