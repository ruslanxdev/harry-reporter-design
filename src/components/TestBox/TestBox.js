import React, { Component, Fragment } from 'react';
import { Text, Button, Link, Flex } from '@primer/components';
import Octicon, { ChevronUp, ChevronDown, Check, X, Clippy, Eye, Code, File, ListUnordered } from '@githubprimer/octicons-react';

import './TestBox.css';

class TestBox extends Component {
  render() {
    const { title, checks = [] } = this.props;
    const testStatus = checks.some(check => check.status === 'fail');
    const color = testStatus ? 'red' : 'green';

    return (
      <div className="TestBox Box Box--condensed">
        <div className="Box-header">
          <Flex flexWrap="nowrap" alignItems="center" justifyContent="space-between">
            <Flex.Item>
              <h3 className="Box-title flex-auto">
                <Text color={`${color}.5`}>{title}</Text>
              </h3>
            </Flex.Item>
            <Flex.Item className="Box-header-controls text-right">
              <Link href="#url" ml={3} color="gray.5"><Octicon icon={Clippy}/></Link>
              <Link href="#url" ml={3} color="gray.5"><Octicon icon={testStatus ? ChevronUp : ChevronDown}/></Link>
            </Flex.Item>
          </Flex>
        </div>
        {checks && checks.map((check, i) => {
          const color =
            check.status === 'success' ? 'green' :
            check.status === 'fail' ? 'red' :
            'gray';
          
          return (
            <div key={i} className="Box-row p-0">
              <div className="Box Box--inner Box--condensed">
                <div className="Box-row Box-subheader Box-row--gray">
                  <Flex flexWrap="nowrap" alignItems="center" justifyContent="space-between">
                    <Flex.Item>
                      <Flex flexWrap="nowrap" alignItems="center">
                        <Flex.Item>
                          <Text color={`${color}.5`} fontWeight="bold" mr={3} className="TestBox-check-title"><Octicon icon={check.status === 'success' ? Check : X} className="mr-2"/> {check.title}</Text>
                          <Text color="gray.5" mr={2}><i>Attempts:</i></Text>
                        </Flex.Item>
                        <Flex.Item>
                          <nav className="subnav f6 mr-2">
                            <a href="#url" className="subnav-item">1</a>
                            {check.status === 'fail' ? (
                              <Fragment>
                                <a href="#url" className="subnav-item">2</a>
                                <a href="#url" className="subnav-item">3</a>
                                <a href="#url" className="subnav-item">4</a>
                                <a href="#url" className="subnav-item">5</a>
                                <a href="#url" className="subnav-item">6</a>
                                <a href="#url" className="subnav-item">7</a>
                                <a href="#url" className="subnav-item selected" aria-current="page">8</a>
                              </Fragment>
                            ) : ''}
                          </nav>
                        </Flex.Item>
                      </Flex>
                    </Flex.Item>
                    <Flex.Item>
                      <div className="BtnGroup mr-1">
                        <Button size="sm" className={`BtnGroup-item ${check.tab === 0 ? 'selected' : ''}`}><Octicon icon={Code}/></Button>
                        <Button size="sm" className={`BtnGroup-item ${check.tab === 1 ? 'selected' : ''}`}><Octicon icon={ListUnordered}/></Button>
                        <Button size="sm" className={`BtnGroup-item ${check.tab === 2 ? 'selected' : ''}`}><Octicon icon={File}/></Button>
                      </div>
                      {check.status === 'fail' ? (
                        <div className="BtnGroup mr-1">
                          <Button size="sm" className="BtnGroup-item">Skip</Button>
                          <Button size="sm" className="BtnGroup-item">Accept</Button>
                        </div>
                      ) : '' }
                      <Button className="mr-3" size="sm">View</Button>
                      <Link href="#url" color="gray.5"><Octicon icon={Eye}/></Link>
                      <Link href="#url" ml={3} color="gray.5"><Octicon icon={check.status === 'fail' ? ChevronUp : ChevronDown}/></Link>
                    </Flex.Item>
                  </Flex>
                </div>
                {check.tab === 0 && check.meta ? (
                  <div className="Box-row Box-row--gray">
                    <strong>Meta-info:</strong>
                    <div className="mt-1 overflow-hidden">
                      <strong>platform:</strong> {check.meta.platform}<br/>
                      <strong>url:</strong> <Link href="#url">{check.meta.url}</Link><br/>
                      <strong>file:</strong> {check.meta.file}<br/>
                      <strong>sessionId:</strong> {check.meta.sessionId}<br/>
                    </div>
                  </div>
                ) : ''}
                {check.tab === 0 && check.code ? (
                  <div className="Box-row">
                    <div className="mt-1">
                      <pre className="pl-3 lh-default text-mono">
                        {check.code}
                      </pre>
                    </div>
                  </div>
                ) : ''}
                {check.tab === 1 && check.description && check.description.steps ? (
                  <Fragment>
                    <div className="Box-row Box-row--gray">
                      <strong>Description:</strong>
                    </div>
                    <div className="Box-row">
                      <div className="mt-1">
                        <pre className="pl-3 lh-default text-mono">
                          {check.description.steps.map(item => `- ${item}\n`)}
                        </pre>
                      </div>
                    </div>
                  </Fragment>
                ) : ''}
                {check.tab === 2 && check.error ? (
                  <div className="Box-row TestBox-error flash flash-full flash-error">
                    <Flex flexWrap="nowrap" justifyContent="space-between">
                      <Flex.Item>
                        <strong>message:</strong> {check.error.message}<br/>
                        <strong>stack:</strong><br/>
                        <div className="TestBox-error-stack">
                          {check.error.stack.map((item, i) => {
                            return <Fragment key={i}><Text>{item}</Text><br/></Fragment>;
                          })}
                        </div>
                      </Flex.Item>
                      <Flex.Item>
                        <img className="border border-red" src={check.error.image} alt="Actual"/>
                      </Flex.Item>
                    </Flex>
                  </div>
                ) : ''}
                {check.tab === 2 && check.asserts ? check.asserts.map((assert, i) => {
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
                      {assert.status === 'fail' && assert.images.expected && assert.images.actual && assert.images.diff ? (
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
                          <div className="Box-row Box-row--gray">
                            <Flex flexWrap="nowrap" alignItems="center" justifyContent="center">
                              <Flex.Item className="Image-viewer-tab">
                                <Text fontWeight="bold">2-up</Text>
                              </Flex.Item>
                              <Flex.Item className="Image-viewer-tab">
                                <Text>Only Diff</Text>
                              </Flex.Item>
                              <Flex.Item className="Image-viewer-tab">
                                <Text>Loupe</Text>
                              </Flex.Item>
                              <Flex.Item className="Image-viewer-tab">
                                <Text>Swipe</Text>
                              </Flex.Item>
                              <Flex.Item className="Image-viewer-tab">
                                <Text>Onion Skin</Text>
                              </Flex.Item>
                            </Flex>
                          </div>
                        </Fragment>
                      ) : ''}
                    </Fragment>
                  );
                }) : ''}
              </div>
            </div>
          ); 
        })}
      </div>
    );
  }
}

export { TestBox };
