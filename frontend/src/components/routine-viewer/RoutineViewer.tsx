import React from 'react';
import Card from '../card/Card';
type RoutineViwerType = {
	data: any;
};

const RoutineViewer: React.FC<RoutineViwerType> = ({ data }) => {
	return (
		<div className=' flex justify-center items-center'>
			<div className='flex flex-col'>
				{data?.doc?.map((routine: any, routineIndex: number) => {
					return routine?.tasks?.map((day: any[], dayIndex: number) => {
						return (
							<div key={dayIndex}>
								<div className='flex flex-col py-4'>
									<p className='text-xl'>Day - {dayIndex + 1}</p>
									<div className={`grid grid-cols-${day?.length} gap-4`}>
										{day?.map((task: any, index: number) => {
											return (
												<Card
													key={index}
													title={task?.title}
													description={task?.description}
													duration={task?.duration}
													objectives={task?.objectives}
												/>
											);
										})}
									</div>
								</div>
							</div>
						);
					});
				})}
			</div>
		</div>
	);
};

export default RoutineViewer;
