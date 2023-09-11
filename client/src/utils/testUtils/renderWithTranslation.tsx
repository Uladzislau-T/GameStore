import { render } from "@testing-library/react";
import i18nForTesting from "../../app/providers/i18n/i18nForTesting";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";


export function renderWithTranslation(component: ReactNode) {
  return render(
      <I18nextProvider i18n={i18nForTesting}>
          {component}
      </I18nextProvider>,
  );
}