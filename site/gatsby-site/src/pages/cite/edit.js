import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import IncidentReportForm from 'components/forms/IncidentReportForm';
import { NumberParam, useQueryParam } from 'use-query-params';
import useToastContext, { SEVERITY } from '../../hooks/useToast';
import { Spinner } from 'react-bootstrap';
import { FIND_REPORT, UPDATE_REPORT } from '../../graphql/reports';
import { useMutation, useQuery } from '@apollo/client/react/hooks';

function EditCitePage(props) {
  const [report, setReport] = useState();

  const [reportNumber] = useQueryParam('reportNumber', NumberParam);

  const { data: reportData } = useQuery(FIND_REPORT, {
    variables: { query: { report_number: reportNumber } },
  });

  const [updateReport] = useMutation(UPDATE_REPORT);

  const addToast = useToastContext();

  useEffect(() => {
    if (reportData) {
      setReport({ ...reportData.incident });
    }
  }, [reportData]);

  const handleSubmit = async (values) => {
    try {
      if (typeof values.authors === 'string') {
        values.authors = values.authors.split(',').map((s) => s.trim());
      }

      if (typeof values.submitters === 'string') {
        values.submitters = values.submitters.split(',').map((s) => s.trim());
      }

      const updated = { ...values, __typename: undefined };

      await updateReport({
        variables: {
          query: {
            report_number: reportNumber,
          },
          set: {
            ...updated,
          },
        },
      });

      addToast({
        message: `Incident report ${reportNumber} updated successfully.`,
        severity: SEVERITY.success,
      });
    } catch (e) {
      addToast({
        message: `Error updating incident report ${reportNumber}`,
        severity: SEVERITY.danger,
      });
    }
  };

  return (
    <Layout {...props} className={'w-100'}>
      <h1 className="mb-5">Editing Incident Report {reportNumber}</h1>

      {report === undefined && (
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
      )}
      {report === null && <div>Report not found</div>}

      {report && (
        <IncidentReportForm incident={report} onUpdate={setReport} onSubmit={handleSubmit} />
      )}
    </Layout>
  );
}

export default EditCitePage;