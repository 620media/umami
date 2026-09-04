import { Grid, Row, Tab, TabList, TabPanel, Tabs } from '@umami/react-zen';
import { GridRow } from '@/components/common/GridRow';
import { Panel } from '@/components/common/Panel';
import { useMessages } from '@/components/hooks';
import { MetricsTable } from '@/components/metrics/MetricsTable';
import { WeeklyTraffic } from '@/components/metrics/WeeklyTraffic';
import { WorldMap } from '@/components/metrics/WorldMap';

// 620: panel layout mirrors the Rybbit overview — tabs are the card headers.
export function WebsitePanels({ websiteId }: { websiteId: string }) {
  const { t, labels } = useMessages();
  const tableProps = {
    websiteId,
    limit: 10,
    allowDownload: false,
    showMore: true,
    metric: t(labels.visitors),
  };

  return (
    <Grid gap="3">
      <GridRow layout="two">
        <Panel>
          <Tabs>
            <TabList>
              <Tab id="referrer">Referrers</Tab>
              <Tab id="channel">Channels</Tab>
              <Tab id="utm">UTM</Tab>
            </TabList>
            <TabPanel id="referrer">
              <MetricsTable type="referrer" title="Referrers" {...tableProps} />
            </TabPanel>
            <TabPanel id="channel">
              <MetricsTable type="channel" title="Channels" {...tableProps} />
            </TabPanel>
            <TabPanel id="utm">
              <MetricsTable type="utmSource" title="UTM" {...tableProps} />
            </TabPanel>
          </Tabs>
        </Panel>
        <Panel>
          <Tabs>
            <TabList>
              <Tab id="path">Pages</Tab>
              <Tab id="title">Titles</Tab>
              <Tab id="entry">Entries</Tab>
              <Tab id="exit">Exits</Tab>
              <Tab id="hostname">Hostnames</Tab>
            </TabList>
            <TabPanel id="path">
              <MetricsTable type="path" title="Pages" {...tableProps} />
            </TabPanel>
            <TabPanel id="title">
              <MetricsTable type="title" title="Titles" {...tableProps} />
            </TabPanel>
            <TabPanel id="entry">
              <MetricsTable type="entry" title="Entries" {...tableProps} />
            </TabPanel>
            <TabPanel id="exit">
              <MetricsTable type="exit" title="Exits" {...tableProps} />
            </TabPanel>
            <TabPanel id="hostname">
              <MetricsTable type="hostname" title="Hostnames" {...tableProps} />
            </TabPanel>
          </Tabs>
        </Panel>
      </GridRow>

      <GridRow layout="two">
        <Panel>
          <Tabs>
            <TabList>
              <Tab id="browser">Browsers</Tab>
              <Tab id="device">Devices</Tab>
              <Tab id="os">Operating Systems</Tab>
              <Tab id="screen">Screen Dimensions</Tab>
            </TabList>
            <TabPanel id="browser">
              <MetricsTable type="browser" title="Browsers" {...tableProps} />
            </TabPanel>
            <TabPanel id="device">
              <MetricsTable type="device" title="Devices" {...tableProps} />
            </TabPanel>
            <TabPanel id="os">
              <MetricsTable type="os" title="Operating Systems" {...tableProps} />
            </TabPanel>
            <TabPanel id="screen">
              <MetricsTable type="screen" title="Screen Dimensions" {...tableProps} />
            </TabPanel>
          </Tabs>
        </Panel>

        <Panel>
          <Tabs>
            <TabList>
              <Tab id="country">Countries</Tab>
              <Tab id="region">Regions</Tab>
              <Tab id="city">Cities</Tab>
              <Tab id="language">Languages</Tab>
              <Tab id="map">Map</Tab>
            </TabList>
            <TabPanel id="country">
              <MetricsTable type="country" title="Countries" {...tableProps} />
            </TabPanel>
            <TabPanel id="region">
              <MetricsTable type="region" title="Regions" {...tableProps} />
            </TabPanel>
            <TabPanel id="city">
              <MetricsTable type="city" title="Cities" {...tableProps} />
            </TabPanel>
            <TabPanel id="language">
              <MetricsTable type="language" title="Languages" {...tableProps} />
            </TabPanel>
            <TabPanel id="map">
              <WorldMap websiteId={websiteId} />
            </TabPanel>
          </Tabs>
        </Panel>
      </GridRow>

      <GridRow layout="two">
        <Panel>
          <Row border="bottom" marginBottom="4" paddingBottom="2">
            Traffic
          </Row>
          <WeeklyTraffic websiteId={websiteId} />
        </Panel>
      </GridRow>
    </Grid>
  );
}
