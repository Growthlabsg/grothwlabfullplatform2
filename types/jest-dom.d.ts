import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveAttribute(attr: string, value?: string): R
      toBeDisabled(): R
      toBeEnabled(): R
      toHaveTextContent(text: string | RegExp): R
      toHaveClass(className: string): R
      toHaveStyle(css: string | Record<string, any>): R
      toBeVisible(): R
      toBeHidden(): R
      toHaveFocus(): R
      toHaveValue(value: string | string[] | number): R
      toBeChecked(): R
      toBePartiallyChecked(): R
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R
      toHaveFormValues(expectedValues: Record<string, any>): R
      toHaveAccessibleDescription(expectedAccessibleDescription?: string | RegExp): R
      toHaveAccessibleName(expectedAccessibleName?: string | RegExp): R
      toHaveErrorMessage(expectedErrorMessage?: string | RegExp): R
    }
  }
}

export {}
