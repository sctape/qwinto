import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

class Die extends PureComponent {

  static propTypes = {
    pips: PropTypes.number.isRequired,
    color: PropTypes.oneOf(['orange', 'yellow', 'purple']),
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
  };

  renderPips = () => {
    switch (this.props.pips) {
      case 1:
        return <circle className="pip-1" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"278.5", cy:"278.5", r:"57.1152344" } } />;
      case 2:
        return <Fragment>
          <circle className="pip-2" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"117.0258789", cy:"117.0263672", r:"57.1152344" } } />
          <circle className="pip-2" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"439.9746094", cy:"439.9736328", r:"57.1152344" } }/>
        </Fragment>;
      case 3:
        return <Fragment>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"278.5", cy:"278.5", r:"57.1152344" } } />
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"117.0258789", cy:"117.0263672", r:"57.1152344" } }/>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"439.9746094", cy:"439.9736328", r:"57.1152344" } }/>
        </Fragment>;
      case 4:
        return <Fragment>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"117.0258789", cy:"117.0263672", r:"57.1152344" } }/>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"117.0258789", cy:"439.9746094", r:"57.1152344" } }/>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"439.9746094", cy:"439.9736328", r:"57.1152344" } }/>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"439.9746094", cy:"117.0263672", r:"57.1152344" } }/>
        </Fragment>;
      case 5:
        return <Fragment>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"278.5", cy:"278.5", r:"57.1152344" } } />
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"117.0258789", cy:"117.0263672", r:"57.1152344" } }/>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"117.0258789", cy:"439.9746094", r:"57.1152344" } }/>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"439.9746094", cy:"439.9736328", r:"57.1152344" } }/>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"439.9746094", cy:"117.0263672", r:"57.1152344" } }/>
        </Fragment>;
      case 6:
        return <Fragment>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"117.0258789", cy:"117.0263672", r:"57.1152344" } }/>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"117.0258789", cy:"278.5", r:"57.1152344" } }/>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"117.0258789", cy:"439.9746094", r:"57.1152344" } }/>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"439.9746094", cy:"439.9736328", r:"57.1152344" } }/>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"439.9746094", cy:"117.0263672", r:"57.1152344" } }/>
          <circle className="pip-3" style={ { fill: "#fff", stroke:"#fff", strokeWidth:5, cx:"439.9746094", cy:"278.5", r:"57.1152344" } }/>
        </Fragment>;
      default:
        return null;
    }
  };

  render() {
    return <svg {...this.props} className={ classnames('die', this.props.color, { disabled: this.props.disabled }) } width="30" height="30" viewBox="0 0 557 557" style={ { overflow:"visible", enableBackground:"new 0 0 557 557" } } >
      <g>
        <rect x="4" y="4" width="549" height="549" rx="68" fill="none" stroke="#fff" strokeWidth="7"/>
        { this.renderPips() }
      </g>
    </svg>
  }
}

export default Die
