import React, { useState, useEffect } from 'react';
import Stats from './Stats';
import ClearFilters from './ClearFilters';
import DisplayModeSwitch from './DisplayModeSwitch';
import Filters from './Filters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Trans } from 'react-i18next';
import CsvExport from './CsvExport';
import Sorting from './Sorting';
import { useInstantSearch } from 'react-instantsearch';

const Controls = () => {
  const { indexUiState } = useInstantSearch();

  const [expandFilters, setExpandFilters] = useState(false);

  useEffect(() => {
    const defaultKeys = ['is_incident_report', 'page', 'display', 'sortBy'];

    const expand = Object.keys(indexUiState.refinementList).some(
      (key) => !defaultKeys.includes(key)
    );

    setExpandFilters(expand);
  }, []);

  return (
    <>
      <div className="justify-between gap-2 mt-4 flex flex-wrap items-center">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex items-center">
            <Stats />
          </div>
          <div className="place-self-center">
            <DisplayModeSwitch />
          </div>
        </div>

        <div className="flex flex-grow justify-end items-center flex-wrap">
          <div className="place-self-center">
            <CsvExport />
          </div>

          <Sorting />

          <div className="justify-end">
            <ClearFilters>
              <Trans>Clear Filters</Trans>
            </ClearFilters>
          </div>

          <div className="grid place-content-center">
            <button
              id="expand-filters"
              data-cy="expand-filters"
              onClick={() => setExpandFilters(!expandFilters)}
              className="select-none cursor-pointer bg-none border-none"
            >
              <FontAwesomeIcon
                className="-align-[0.2rem]"
                icon={expandFilters ? faCaretDown : faCaretRight}
                fixedWidth
              />
              <Trans>Filter Search</Trans>
            </button>
          </div>
        </div>
      </div>
      <div className={'mb-3 invisible h-0' + (expandFilters ? ' md:visible h-auto' : '')}>
        <Filters />
      </div>
    </>
  );
};

export default Controls;
