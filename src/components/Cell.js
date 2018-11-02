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
  };

  static defaultProps = {
    hidden: false,
    bonus: false,
  };

  handleChange = (event) => {
    this.props.updateScore(event.target.value);
  };

  render() {
    const { value, row, column, hidden, bonus } = this.props;

    return (
      <div className={ classnames('cell-container')}>
        <div className={ classnames('cell', { 'hidden': hidden }, { 'bonus': bonus })}>
          <input type="text" value={ value } name={ `${row}-${column}` } onChange={ this.handleChange } />
        </div>
      </div>
    )
  }
}

export default Cell
