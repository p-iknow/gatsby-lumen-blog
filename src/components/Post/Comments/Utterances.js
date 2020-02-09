import React, { useEffect } from 'react';

const Utterences = () => {
  const rootElm = React.createRef();

  const utterancesConfig = {
    src: 'https://utteranc.es/client.js',
    repo: 'P-iknow/p-iknow-devlog-comment',
    'issue-term': 'title',
    label: 'comment',
    theme: 'github-light',
    crossorigin: 'anonymous',
    async: true,
  };

  useEffect(() => {
    const utterances = document.createElement('script');

    Object.keys(utterancesConfig).forEach(configKey => {
      utterances.setAttribute(configKey, utterancesConfig[configKey]);
    });
    rootElm.current.appendChild(utterances);
  }, []);

  return <div className="utterences" ref={rootElm} />;
};

export default Utterences;
