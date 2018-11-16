import React, { Component, Fragment } from 'react';
import { Text, Button, Link, Flex } from '@primer/components';
import Octicon, { ChevronUp, Check, X, Clippy, Eye, Code, File, ListUnordered } from '@githubprimer/octicons-react';

import './TestBox.css';

class TestBox extends Component {
  render() {
    const { title, meta, description = { steps: [] }, code, checks = [], tab = 2 } = this.props;

    return (
      <div className="TestBox Box Box--condensed">
        <div className="Box-header">
          <Flex flexWrap="nowrap" alignItems="center" justifyContent="space-between">
            <Flex.Item>
              <h3 className="Box-title flex-auto">
                <Text color="red.5">{title}</Text>
              </h3>
            </Flex.Item>
            <Flex.Item className="Box-header-controls text-right">
              <div className="BtnGroup mr-1">
                <Button size="sm" className={`BtnGroup-item ${tab === 0 ? 'selected' : ''}`}><Octicon icon={Code}/></Button>
                <Button size="sm" className={`BtnGroup-item ${tab === 1 ? 'selected' : ''}`}><Octicon icon={ListUnordered}/></Button>
                <Button size="sm" className={`BtnGroup-item ${tab === 2 ? 'selected' : ''}`}><Octicon icon={File}/></Button>
              </div>
              <Button size="sm">View</Button>
              <Link href="#url" ml={3} color="gray.5"><Octicon icon={Clippy}/></Link>
              <Link href="#url" ml={3} color="gray.5"><Octicon icon={ChevronUp}/></Link>
            </Flex.Item>
          </Flex>
        </div>
        {tab === 0 && meta ? (
          <div className="Box-row Box-row--gray">
            <strong>Meta-info:</strong>
            <div className="mt-1 overflow-hidden">
              <strong>platform:</strong> {meta.platform}<br/>
              <strong>url:</strong> <Link href="#url">{meta.url}</Link><br/>
              <strong>file:</strong> {meta.file}<br/>
              <strong>sessionId:</strong> {meta.sessionId}<br/>
            </div>
          </div>
        ) : ''}
        {tab === 0 && code ? (
          <div className="Box-row">
            <div className="mt-1">
              <pre className="pl-3 lh-default text-mono">
                {code}
              </pre>
            </div>
          </div>
        ) : ''}
        {tab === 1 && description && description.steps ? (
          <Fragment>
            <div className="Box-row Box-row--gray">
              <strong>Description:</strong>
            </div>
            <div className="Box-row">
              <div className="mt-1">
                <pre className="pl-3 lh-default text-mono">
                  {description.steps.map(item => `- ${item}\n`)}
                </pre>
              </div>
            </div>
          </Fragment>
        ) : ''}
        {tab === 2 && checks && checks.map((check, i) => {
          const color =
            check.status === 'success' ? 'green' :
            check.status === 'fail' ? 'red' :
            'gray';
          
          return (
            <div key={i} className="Box-row p-0">
              <div className="Box Box--inner Box--condensed">
                <div className="Box-row Box-subheader">
                  <Flex flexWrap="nowrap" alignItems="center" justifyContent="space-between">
                    <Flex.Item>
                      <Text color={`${color}.5`} fontWeight="bold"><Octicon icon={check.status === 'success' ? Check : X} className="mr-2"/> {check.title}</Text>
                    </Flex.Item>
                    <Flex.Item>
                      <Flex flexWrap="nowrap" alignItems="center">
                        <Flex.Item>
                          <Text mr={2}>Attempts:</Text>
                        </Flex.Item>
                        <Flex.Item>
                          <nav className="subnav f6 mr-2">
                            <a href="#url" className="subnav-item">1</a>
                            <a href="#url" className="subnav-item">2</a>
                            <a href="#url" className="subnav-item">3</a>
                            <a href="#url" className="subnav-item">4</a>
                            <a href="#url" className="subnav-item">5</a>
                            <a href="#url" className="subnav-item">6</a>
                            <a href="#url" className="subnav-item">7</a>
                            <a href="#url" className="subnav-item selected" aria-current="page">8</a>
                          </nav>
                        </Flex.Item>
                        <Flex.Item>
                          <div className="BtnGroup mr-3">
                            <Button size="sm" className="BtnGroup-item">Skip</Button>
                            <Button size="sm" className="BtnGroup-item">Accept</Button>
                          </div>
                          <Link href="#url" color="gray.5"><Octicon icon={Eye}/></Link>
                          <Link href="#url" ml={3} color="gray.5"><Octicon icon={ChevronUp}/></Link>
                        </Flex.Item>
                      </Flex>
                    </Flex.Item>
                  </Flex>
                </div>
                {check.error ? (
                  <div className="Box-row flash flash-full flash-error">
                    <strong>message:</strong> {check.error.message}<br/>
                    <strong>stack:</strong><br/>
                    <div className="TestBox-error-stack">
                      {check.error.stack.map((item, i) => {
                        return <Fragment><Text>{item}</Text><br/></Fragment>;
                      })}
                    </div>
                  </div>
                ) : ''}
                {check.asserts.map((assert, i) => {
                  const color =
                    assert.status === 'success' ? 'green' :
                    assert.status === 'fail' ? 'red' :
                    'gray';

                  return (
                    <Fragment key={i}>
                      {assert.title ? (
                        <div className="Box-row Box-row--gray">
                          <Flex flexWrap="nowrap" alignItems="center" justifyContent="space-between">
                            <Flex.Item>
                              <Text color={`${color}.5`} fontWeight="bold">{assert.title}</Text>
                            </Flex.Item>
                            <Flex.Item>
                              <Link href="#url">{assert.status === 'success' ? 'Show' : 'Hide'}</Link>
                            </Flex.Item>
                          </Flex>
                        </div>
                      ) : ''}
                      {assert.status === 'fail' ? (
                        <Fragment>
                          <div className="Box-row Box-row--darkgray">
                            <Flex className="Image-viewer" flexWrap="nowrap" alignItems="center" justifyContent="center">
                              {assert.images.expected ? (
                                <Flex.Item className="Image-item">
                                  <div className="Image-title"><Text color="green.5" fontWeight="bold">Expected</Text></div>
                                  <img className="border border-green" src={assert.images.expected} alt="Expected"/>
                                </Flex.Item>
                              ) : ''}
                              {assert.images.actual ? (
                                <Flex.Item className="Image-item">
                                  <div className="Image-title"><Text color="red.5" fontWeight="bold">Actual</Text></div>
                                  <img className="border border-red" src={assert.images.actual} alt="Actual"/>
                                </Flex.Item>
                              ) : ''}
                              {assert.images.diff ? (
                                <Flex.Item className="Image-item">
                                  <div className="Image-title"><Text color="gray.5" fontWeight="bold">Diff</Text></div>
                                  <img src={assert.images.diff} alt="Diff"/>
                                </Flex.Item>
                              ) : ''}
                            </Flex>
                          </div>
                          {assert.images.expected && assert.images.actual && assert.images.diff ? (
                            <div className="Box-row Box-row--gray">
                              <Flex flexWrap="nowrap" alignItems="center" justifyContent="center">
                                <Flex.Item className="Image-viewer-tab">
                                  <Text>2-up</Text>
                                </Flex.Item>
                                <Flex.Item className="Image-viewer-tab">
                                  <Text fontWeight="bold">Diff</Text>
                                </Flex.Item>
                                <Flex.Item className="Image-viewer-tab">
                                  <Text>Swipe</Text>
                                </Flex.Item>
                                <Flex.Item className="Image-viewer-tab">
                                  <Text>Onion Skin</Text>
                                </Flex.Item>
                              </Flex>
                            </div>
                          ) : '' }
                        </Fragment>
                      ) : ''}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          ); 
        })}
      </div>
    );
  }
}

export { TestBox };
