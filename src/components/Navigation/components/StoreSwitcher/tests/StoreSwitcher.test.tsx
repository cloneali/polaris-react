import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Switcher from '../../../../StoreSwitcher';
import Menu from '../../Menu';
import StoreSwitcher from '../StoreSwitcher';

describe('<StoreSwitcher />', () => {
  const mockProps = {
    shops: [
      {
        name: '',
        url: '',
      },
    ],
    searchPlaceholder: '',
    noResultsMessage: '',
    activeIndex: 0,
  };

  describe('shops', () => {
    it('gets passed into the switcher', () => {
      const shops = [
        {
          name: '',
          url: '',
        },
      ];
      const storeSwitcher = mountWithAppProvider(
        <StoreSwitcher {...mockProps} shops={shops} />,
      );
      expect(storeSwitcher.find(Switcher).prop('shops')).toEqual(shops);
    });
  });

  describe('searchPlaceholder', () => {
    it('gets passed into the switcher', () => {
      const searchPlaceholder = 'Search for a shop.';
      const storeSwitcher = mountWithAppProvider(
        <StoreSwitcher {...mockProps} searchPlaceholder={searchPlaceholder} />,
      );
      expect(storeSwitcher.find(Switcher).prop('searchPlaceholder')).toEqual(
        searchPlaceholder,
      );
    });
  });

  describe('activeIndex', () => {
    it('gets passed into the switcher', () => {
      const activeIndex = 0;
      const storeSwitcher = mountWithAppProvider(
        <StoreSwitcher {...mockProps} activeIndex={activeIndex} />,
      );
      expect(storeSwitcher.find(Switcher).prop('activeIndex')).toEqual(
        activeIndex,
      );
    });

    it('passes the name of the active shop into the menu', () => {
      const activeIndex = 0;
      const activeShopName = 'Little Victories CA';
      const shops = [
        {
          name: activeShopName,
          url: '',
        },
      ];
      const storeSwitcher = mountWithAppProvider(
        <StoreSwitcher
          {...mockProps}
          shops={shops}
          activeIndex={activeIndex}
        />,
      );
      expect(storeSwitcher.find(Menu).prop('title')).toEqual(activeShopName);
    });
  });

  describe('noResultsMessage', () => {
    it('gets passed into the switcher', () => {
      const noResultsMessage = 'No shops found.';
      const storeSwitcher = mountWithAppProvider(
        <StoreSwitcher {...mockProps} noResultsMessage={noResultsMessage} />,
      );
      expect(storeSwitcher.find(Switcher).prop('noResultsMessage')).toEqual(
        noResultsMessage,
      );
    });
  });

  describe('activatorAccessibilityLabel', () => {
    it('gets passed into the menu', () => {
      const activatorAccessibilityLabel = 'Show shop switcher.';
      const storeSwitcher = mountWithAppProvider(
        <StoreSwitcher
          {...mockProps}
          activatorAccessibilityLabel={activatorAccessibilityLabel}
        />,
      );
      expect(
        storeSwitcher.find(Menu).prop('activatorAccessibilityLabel'),
      ).toEqual(activatorAccessibilityLabel);
    });
  });

  describe('<Menu />', () => {
    it('receives a logo image when available', () => {
      const logoSource = './logo.png';
      const logoAccessibilityLabel = 'Company Logo';
      const storeSwitcher = mountWithAppProvider(
        <StoreSwitcher {...mockProps} />,
        {
          context: {
            polarisTheme: {
              logo: {
                storeSwitcherSource: logoSource,
                accessibilityLabel: logoAccessibilityLabel,
              },
            },
          },
        },
      );
      const {props: logoImageProps} = storeSwitcher
        .find(Menu)
        .prop('avatar') as any;
      expect(logoImageProps.source).toBe(logoSource);
      expect(logoImageProps.alt).toBe(logoAccessibilityLabel);
    });
  });
});