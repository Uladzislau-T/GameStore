import { fireEvent, screen } from '@testing-library/react';
import { renderWithTranslation } from "../../../../utils/testUtils/renderWithTranslation";
import { Sidebar } from '../../../../components/sidebar';

describe('Sidebar', () => {
  test('with only first param', () => {
      renderWithTranslation(<Sidebar collapsed={false}/>);
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('test toggle', () => {
      renderWithTranslation(<Sidebar collapsed={true}/>);
      // const toggleBtn = screen.getByTestId('sidebar-toggle');
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
      // fireEvent.click(toggleBtn);
      expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});