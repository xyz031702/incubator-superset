import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import { ParentSize } from '@vx/responsive';
import { chartPropShape } from '../../dashboard/util/propShapes';
import ChartContainer from '../../chart/ChartContainer';
import ExploreChartHeader from './ExploreChartHeader';
import Hotkeys from '../../components/Hotkeys';

const propTypes = {
  actions: PropTypes.object.isRequired,
  addHistory: PropTypes.func,
  onQuery: PropTypes.func,
  can_overwrite: PropTypes.bool.isRequired,
  can_download: PropTypes.bool.isRequired,
  datasource: PropTypes.object,
  column_formats: PropTypes.object,
  containerId: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  isStarred: PropTypes.bool.isRequired,
  slice: PropTypes.object,
  table_name: PropTypes.string,
  vizType: PropTypes.string.isRequired,
  form_data: PropTypes.object,
  standalone: PropTypes.bool,
  timeout: PropTypes.number,
  refreshOverlayVisible: PropTypes.bool,
  chart: chartPropShape,
  errorMessage: PropTypes.node,
  triggerRender: PropTypes.bool,
  hotKeys: PropTypes.object,
};

class ExploreChartPanel extends React.PureComponent {
  renderChart() {
    const { chart } = this.props;
    const headerHeight = this.props.standalone ? 0 : 80;

    return (
      <ParentSize>
        {({ width, height }) => (width > 0 && height > 0) && (
          <ChartContainer
            width={Math.floor(width)}
            height={parseInt(this.props.height, 10) - headerHeight}
            annotationData={chart.annotationData}
            chartAlert={chart.chartAlert}
            chartStackTrace={chart.chartStackTrace}
            chartId={chart.id}
            chartStatus={chart.chartStatus}
            triggerRender={this.props.triggerRender}
            datasource={this.props.datasource}
            errorMessage={this.props.errorMessage}
            formData={this.props.form_data}
            onQuery={this.props.onQuery}
            queryResponse={chart.queryResponse}
            refreshOverlayVisible={this.props.refreshOverlayVisible}
            setControlValue={this.props.actions.setControlValue}
            timeout={this.props.timeout}
            triggerQuery={chart.triggerQuery}
            vizType={this.props.vizType}
          />
        )}
      </ParentSize>
    );
  }

  render() {
    if (this.props.standalone) {
      // dom manipulation hack to get rid of the boostrap theme's body background
      const standaloneClass = 'background-transparent';
      const bodyClasses = document.body.className.split(' ');
      if (bodyClasses.indexOf(standaloneClass) === -1) {
        document.body.className += ` ${standaloneClass}`;
      }
      return this.renderChart();
    }

    const header = (
      <ExploreChartHeader
        actions={this.props.actions}
        addHistory={this.props.addHistory}
        can_overwrite={this.props.can_overwrite}
        can_download={this.props.can_download}
        isStarred={this.props.isStarred}
        slice={this.props.slice}
        table_name={this.props.table_name}
        form_data={this.props.form_data}
        timeout={this.props.timeout}
        chart={this.props.chart}
      />
    );
    return (
      <div className="chart-container">
        <Panel
          style={{ height: this.props.height }}
          header={header}
        >
          {this.renderChart()}
          <div style={{
            marginTop: -81,
            zIndex: 100,
            float: 'right',
          }}
          >
            <Hotkeys
              header="Keyboard shortcuts"
              hotkeys={this.props.hotKeys()}
            />
          </div>
        </Panel>
      </div>
    );
  }
}

ExploreChartPanel.propTypes = propTypes;

export default ExploreChartPanel;
