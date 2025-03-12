import * as React from 'react';

interface AboutProps {
    handleBack: () => void;
}

export function About(props:AboutProps ) {
    return (
        <div className="about-view">
            <h2>License</h2>
            <p>
                This plugin is licensed under the MIT License.
                You are free to use, copy, modify, merge, publish, distribute,
                sublicense, and/or sell copies of the software, subject to
                the license terms.
            </p>

            <h2>Credits</h2>
            <p>
                Created and maintained by <strong>B. Xiao</strong>.
            </p>

            <h2>Contact</h2>
            <p>
                If you encounter any bugs, issues, or have feature requests,
                please reach out via bowei.xiao@ionos.com.
            </p>
            <button className='button' onClick={props.handleBack}>Back</button>
        </div>
    );
}