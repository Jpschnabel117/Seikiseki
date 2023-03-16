import React, {useMemo} from 'react';

function WorldFeaturesMemoized(props) {
  // compute some value based on props

  // expensive computation based on props
  const mapMarks = useMemo(() => {
    return props.worldGeoData.features.map((feature) => {
      return (
        <>
          <path className="wMapFeature" d={props.path(feature)} />
        </>
      );
    });
  }, [props.worldGeoData]);

  return <>{mapMarks}</>;
}

export default React.memo(WorldFeaturesMemoized);
