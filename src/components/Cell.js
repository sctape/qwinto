import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Cell extends PureComponent {
  static propTypes = {
    row: PropTypes.string.isRequired,
    column: PropTypes.number.isRequired,
    value: PropTypes.number,
    hidden: PropTypes.bool.isRequired,
    bonus: PropTypes.bool.isRequired,
    updateScore: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    hidden: false,
    bonus: false,
    disabled: false
  };

  handleChange = () => {
    if (this.disabled) {
      return;
    }

    return this.props.updateScore();
  };

  render() {
    const { value, hidden, bonus, disabled } = this.props;

    return (
      <div className={ classnames('cell-container')}>
        <div className={ classnames('cell', { 'hidden': hidden }, { 'bonus': bonus }, {'disabled': disabled})} onClick={ this.handleChange }>
          { value }
        </div>
      </div>
    )
  }
}

export default Cell
