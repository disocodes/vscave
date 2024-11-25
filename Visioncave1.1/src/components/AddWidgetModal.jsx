import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function AddWidgetModal({ isOpen, onClose, widgets, onAddWidget }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white mb-4"
                >
                  Add Widget
                </Dialog.Title>

                <div className="grid grid-cols-1 gap-4">
                  {widgets.map((widget) => (
                    <button
                      key={widget.id}
                      className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 text-left"
                      onClick={() => {
                        onAddWidget(widget)
                        onClose()
                      }}
                    >
                      <h4 className="text-white font-medium">{widget.name}</h4>
                      <p className="text-gray-400 text-sm mt-1">{widget.description}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-2">
                        {widget.type}
                      </span>
                    </button>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
