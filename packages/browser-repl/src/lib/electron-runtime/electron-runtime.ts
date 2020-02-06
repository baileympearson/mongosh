import {
  setupEvaluationContext
} from '../runtime-helpers/setup-evaluation-context';

import {
  Interpreter,
} from '../interpreter';

import {
  ElectronInterpreterEnvironment
} from './electron-interpreter-environment';

import {
  addShellTypeToResult
} from '../runtime-helpers/add-shell-type-to-result';

import {
  Runtime,
  EvaluationResult
} from '../../components/runtime';

export class ElectronRuntime implements Runtime {
  private interpreter: Interpreter;
  private serviceProvider: object;

  constructor(serviceProvider: object) {
    this.serviceProvider = serviceProvider;

    const context = {};

    setupEvaluationContext(
      context,
      this.serviceProvider
    );

    const environment = new ElectronInterpreterEnvironment(context);
    this.interpreter = new Interpreter(environment);
  }

  async evaluate(code: string): Promise<EvaluationResult> {
    return addShellTypeToResult(await this.interpreter.evaluate(code));
  }
}
