import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ActionView from './ActionView'
import { getModel, getActionView, isOpen } from '../store/selectors'
import { closeTaskContainer } from '../store/actions'
import ErrorBoundary from '../../../utils/ErrorBoundry'

const TaskContainer = ({open, actionView, model, dispatch}) => (
  <div className={`task-container card ${open ? '' : 'd-none'}`}>
    <ErrorBoundary>
      <div className="card-header bg-dark-grey">
        <h3>
          {actionView === 'task' || actionView === 'create' ? 'Create Task' : `${actionView} ${model.name}`}
          <a
            href="javascript:void(0)" onClick={() => dispatch(closeTaskContainer())}
            className="float-right text-muted btn btn-xs btn-outline-secondary px-2">
            X
          </a>
        </h3>
      </div>
      {/* card-body and card-footer are in the action views */}
      <ActionView view={actionView} model={model} toggle={() => dispatch(closeTaskContainer())} />
    </ErrorBoundary>
  </div>
)

TaskContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
  model: getModel(state),
  open: isOpen(state),
  actionView: getActionView(state),
}))(TaskContainer)